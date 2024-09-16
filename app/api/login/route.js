import { connectMongoDB } from "../../../lib/ConnectDb";
import User from "../../../models/User";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { generateToken } from "../../../lib/jwt";

export async function POST(req) {
  console.log("Login API Request Received");

  try {
    await connectMongoDB();
    console.log("Connected to MongoDB");

    const data = await req.json();
    console.log("Data received from login request:", data);

    // Find user by email
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Compare the plain password with the hashed password
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT token including user ID and role
    const token = generateToken({ _id: user._id, email: user.email, role: user.userType });

    // Return token and user type
    return NextResponse.json({ message: "Login successful", token, userType: user.userType ,userId:user._id,name:user.name });
  } catch (error) {
    console.error("Error in login API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
