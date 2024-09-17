// pages/api/ResetPasswordRequest.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';  // Adjust based on your User model
import { sendPasswordResetEmail } from '../../../lib/sendEmail';  // Ensure this path is correct
import { connectMongoDB } from '../../../lib/ConnectDb';  // Ensure this path is correct

export async function POST(req) {
  try {
    await connectMongoDB();  // Ensure MongoDB is connected

    const { email } = await req.json();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the reset email
    await sendPasswordResetEmail(user.email, resetToken);

    return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);  // Log the error for debugging
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
