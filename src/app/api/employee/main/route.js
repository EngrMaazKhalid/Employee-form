import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

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

    const { name, Fname, City, CNIC, dob, blood } = body;

    // Query to get the latest employee_id
    const [rows] = await pool.query(
      `SELECT employee_id FROM employee_main_info ORDER BY employee_id DESC LIMIT 1`
    );

    // If the table is empty, start from 1; otherwise, increment the latest employee_id
    let employeeId = rows.length > 0 ? rows[0].employee_id + 1 : 1;
    // Insert the data into the employee_main_info table
    const query = `
      INSERT INTO employee_main_info 
      (employee_id, name, father_name, city, cnic_number, date_of_birth, blood_group) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(query, [
      employeeId,
      name,
      Fname,
      City,
      CNIC,
      dob,
      blood,
    ]);

    // const employeeId = result.insertId;
    // Return a successful response
    return NextResponse.json({
      message: "Employee main info added successfully!",
      employeeId,
      result,
    });
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error("Error adding employee info:", error);
    return NextResponse.json(
      { error: "Failed to add employee info" },
      { status: 500 }
    );
  }
}
