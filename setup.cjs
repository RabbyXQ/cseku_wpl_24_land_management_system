const mysql = require('mysql2/promise');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',  
      user: 'root',       
      password: '',      
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS daag');
    console.log('Database "daag" created or already exists!');

    await connection.end();
  } catch (err) {
    console.error('Error creating database:', err);
    process.exit(1);
  }
}

async function runMigrations() {
  try {
    console.log('Running migrations...');

    await prisma.$executeRaw`SELECT 1`;

    console.log('Migrations applied successfully!');
  } catch (e) {
    console.error('Error running migrations:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  await createDatabase();
  await runMigrations();
  process.exit(0);
}

main().catch((err) => {
  console.error('Error in migration process:', err);
  process.exit(1);
});
