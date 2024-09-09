import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Create a MySQL connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(request) {
  try {
    // Parse the request body (form data sent as JSON)
    const body = await request.json();

    const { name, Fname, Address, City, CNIC, dob, blood } = body;

    // Insert the data into the employee_main_info table
    const query = `
      INSERT INTO employee_main_info 
      (name, father_name, address, city, cnic_number, date_of_birth, blood_group) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(query, [
      name, Fname, Address, City, CNIC, dob, blood,
    ]);

    const employeeId = result.insertId;
    // Return a successful response
    return NextResponse.json({
      message: 'Employee main info added successfully!',
      employeeId,
      result,
    });
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error('Error adding employee info:', error);
    return NextResponse.json({ error: 'Failed to add employee info' }, { status: 500 });
  }
}
