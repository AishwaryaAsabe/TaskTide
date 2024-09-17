// nextapp/nextapp/app/api/reset-password/route.js
import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../lib/ConnectDb';  // Correct import statement
import User from '../../../models/User';  // Adjust path as needed
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await connectMongoDB();  // Ensure MongoDB connection

  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ message: 'Token and password are required' }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }
}
