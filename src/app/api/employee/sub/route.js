
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a connection to your MySQL database
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to insert the sub information into the database
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      employeeId,  // Make sure employeeId is received here
      CAddress,
      CArea,
      Ccity,
      PAddress,
      PArea,
      Pcity,
      mobile,
      phone,
      Ename,
      ECname,
      Emobile,
      email,
      doj,
    } = body;

    // Check if employeeId is present
    if (!employeeId) {
      return NextResponse.json({ success: false, error: 'Employee ID is required as a foreign key' });
    }

    // Insert query for `employee_sub_info`
    const query = `
      INSERT INTO employee_sub_info
      (employee_id, current_address, current_area, current_city, permanent_address, permanent_area, permanent_city, mobile_number, phone_number, emergency_contact_name, emergency_contact_relation, emergency_contact_number, email_address, date_of_joining)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      employeeId,
      CAddress,
      CArea,
      Ccity,
      PAddress,
      PArea,
      Pcity,
      mobile,
      phone,
      Ename,
      ECname,
      Emobile,
      email,
      doj,
    ];

    // Execute the query
    const [result] = await connection.execute(query, values);

    return NextResponse.json({ success: true, message: 'Data saved successfully!', data: result });
  } catch (error) {
    console.error('Error inserting data into employee_sub_info:', error);
    return NextResponse.json({ success: false, error: 'Failed to save data' });
  }
}

