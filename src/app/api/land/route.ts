// app/api/land/route.ts
import { NextResponse } from 'next/server';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;



const logHistory = (action: string, userId: string, data: any) => {
  return {
    action,
    userId,
    timestamp: new Date().toISOString(),
    details: data,
  };
};



export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const lands = await prisma.land.findMany({
      where: { createdBy: decoded.userId },
    });

    if (!lands.length) {
      return NextResponse.json({ error: 'No land records found' }, { status: 404 });
    }

    return NextResponse.json(lands, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const data = await req.json();

    const newLand = await prisma.land.create({
      data: {
        name: data.name,
        location: data.location,
        size: data.size,
        owner: data.owner,
        landType: data.landType,
        marketValue: data.marketValue,
        notes: data.notes,
        polygons: data.polygons,
        createdBy: decoded.userId,
        updatedBy: decoded.userId,
        history: {
          create: logHistory('create', decoded.userId, data),
        },
      },
    });

    return NextResponse.json(newLand, { status: 201 });
  } catch (error) {
    console.error('Creation error:', error);
    return NextResponse.json({ error: 'Error creating land' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const data = await req.json();

    const land = await prisma.land.findUnique({
      where: { id: data.id, createdBy: decoded.userId },
    });

    if (!land) {
      return NextResponse.json({ error: 'Land record not found' }, { status: 404 });
    }

    const updatedLand = await prisma.land.update({
      where: { id: data.id },
      data: {
        name: data.name,
        location: data.location,
        size: data.size,
        owner: data.owner,
        landType: data.landType,
        marketValue: data.marketValue,
        notes: data.notes,
        polygons: data.polygons,
        updatedBy: decoded.userId,
        history: {
          push: logHistory('update', decoded.userId, data),
        },
      },
    });

    return NextResponse.json(updatedLand, { status: 200 });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Error updating land' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const { id } = await req.json();

    const land = await prisma.land.findUnique({
      where: { id, createdBy: decoded.userId },
    });

    if (!land) {
      return NextResponse.json({ error: 'Land record not found' }, { status: 404 });
    }

    await prisma.land.update({
      where: { id },
      data: {
        history: {
          push: logHistory('delete', decoded.userId, land),
        },
      },
    });

    await prisma.land.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Land record deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Error deleting land' }, { status: 500 });
  }
}
