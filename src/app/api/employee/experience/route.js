
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a connection to your MySQL database
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to insert the experience data into the database
export async function POST(req) {
  try {
    const body = await req.json();
    const { employeeId, job, company, years, Clocation, summary } = body;

    // Ensure employeeId is present
    if (!employeeId) {
      return NextResponse.json({ success: false, error: 'Employee ID is required' });
    }

    // Insert query for employee_experience
    const query = `
      INSERT INTO employee_experience 
      (employee_id, job_title, company_name, number_of_years, company_location, summary) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [employeeId, job, company, years, Clocation, summary];

    // Execute the query
    const [result] = await connection.execute(query, values);

    return NextResponse.json({ success: true, message: 'Data saved successfully!', data: result });
  } catch (error) {
    console.error('Error inserting data into employee_experience:', error);
    return NextResponse.json({ success: false, error: 'Failed to save data' });
  }
}
