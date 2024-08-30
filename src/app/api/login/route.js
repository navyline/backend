import { NextResponse } from "next/server";
import { Client } from "pg";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function POST(request) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const { username, password } = await request.json();
    const res = await client.query('SELECT * FROM tbl_users WHERE username = $1', [username]);

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = res.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', user, token }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.end(); // ปิดการเชื่อมต่อหลังจากใช้งานเสร็จ
  }
}
