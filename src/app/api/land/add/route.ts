import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

// POST: Add new land
export async function POST(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const createdBy = decoded.userId;

    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.location || !data.size || !data.owner || !data.marketValue || !data.polygons) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newLand = await prisma.land.create({
      data: {
        name: data.name,
        location: data.location,
        size: data.size,
        owner: data.owner,
        landType: data.landType || null,
        marketValue: data.marketValue,
        notes: data.notes || null,
        polygons: data.polygons,
        createdBy: createdBy,
        updatedBy: null,
        history: data.history || null,
      },
    });

    return NextResponse.json(newLand, { status: 201 });
  } catch (error) {
    console.error('Error creating land entry:', error);
    return NextResponse.json({ error: 'Error adding land entry' }, { status: 500 });
  }
}

// PUT: Update land information
export async function PUT(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const updatedBy = decoded.userId;

    const data = await req.json();

    const { id, ...updateData } = data;

    // Validate if land ID is provided
    if (!id) {
      return NextResponse.json({ error: 'Land ID is required' }, { status: 400 });
    }

    // Check if land exists
    const existingLand = await prisma.land.findUnique({ where: { id } });
    if (!existingLand) {
      return NextResponse.json({ error: 'Land not found' }, { status: 404 });
    }

    const updatedLand = await prisma.land.update({
      where: { id },
      data: {
        ...updateData,
        updatedBy: updatedBy,
      },
    });

    return NextResponse.json(updatedLand, { status: 200 });
  } catch (error) {
    console.error('Error updating land entry:', error);
    return NextResponse.json({ error: 'Error updating land entry' }, { status: 500 });
  }
}

// GET: Fetch land by ID or all lands
export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET);

    const url = new URL(req.url);
    const id = url.searchParams.get('id'); // e.g., /api/land?id=1

    if (id) {
      // Fetch specific land by ID
      const land = await prisma.land.findUnique({ where: { id: parseInt(id) } });

      if (!land) {
        return NextResponse.json({ error: 'Land not found' }, { status: 404 });
      }

      return NextResponse.json(land, { status: 200 });
    } else {
      // Fetch all lands
      const lands = await prisma.land.findMany();
      return NextResponse.json(lands, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching land data:', error);
    return NextResponse.json({ error: 'Error fetching land data' }, { status: 500 });
  }
}
