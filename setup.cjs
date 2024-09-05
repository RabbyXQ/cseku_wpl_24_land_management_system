const mysql = require('mysql2/promise');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function createDatabase() {

  const connection = await mysql.createConnection({
    host: 'localhost',  
    user: 'root',       
    password: 'R00t@82690874',      
  });

  try {
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

// async function createUserTable{
//   const query = `
//       CREATE TABLE IF NOT EXISTS User(
//       id INT PRIMARY_KEY AUTO_INCREMENT,
//       user_name VARCHAR(255) NOT NULL,
//       user_role INT DEFAULT 1,
//       email VARCHAR(255) NOT NULL,
//       mobile VARCHAR(255) NOT NULL,
//       first_name VARCHAR(255) DEFAULT NULL,
//       last_name VARCHAR(255) DEFAULT NULL,
//       age INT,
//       occupation VARCHAR(255) DEFAULT NULL,
//       )
//   `;

//   try{
//     console.log("Creating User Tables...");
//     await connection.query(query);
//     console.log("User table created successfully.");
//   }catch(err){
//     console.log("Error creating User Tables...");
//     process.exit(1);
//   }

// }

async function main() {
  await createDatabase();
  await runMigrations();
  process.exit(0);
}

main().catch((err) => {
  console.error('Error in migration process:', err);
  process.exit(1);
});
