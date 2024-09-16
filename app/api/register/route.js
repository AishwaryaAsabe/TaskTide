import { connectMongoDB } from "../../../lib/ConnectDb";
import { NextResponse } from "next/server";
import User from "../../../models/User";
import bcrypt from 'bcryptjs';

export async function POST(req) {
  console.log("Registration API Request Received");

  try {
    await connectMongoDB();
    console.log("Connected to MongoDB");

    const data = await req.json();
    console.log("Data received from registration request:", data);

    // Check if the user already exists
    const existingUser = await User.findOne({ email: data.email });
    console.log("Existing User:", existingUser);
    if (existingUser) {
      console.log("Email already exists");
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log("Hashed Password:", hashedPassword);

    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      userType: data.userType,
      
    });

    await newUser.save();
    console.log("User registered successfully", newUser);

    return NextResponse.json({ message: "User registered", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in registration API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  // Your GET handler logic
}
