// import { connectMongoDB } from "../../../lib/ConnectDb";
// import { NextResponse } from "next/server";
// import User from "../../../models/User";
// import bcrypt from 'bcryptjs';
// import axios from 'axios';






// export async function POST(req) {
//   console.log("Registration API Request Received");

//   try {
//     await connectMongoDB();
//     console.log("Connected to MongoDB");

//     const data = await req.json();
//     console.log("Data received from registration request:", data);

//     const { email, password, name, userType } = data;

//     // Email validation using Kickbox API
//     const kickboxApiKey = process.env.KICKBOX_API_KEY;
//     const emailValidationUrl = `https://api.kickbox.com/v2/verify?email=${email}&apikey=${kickboxApiKey}`;

//     try {
//       const response = await axios.get(emailValidationUrl);
//       const emailData = response.data;

//       if (emailData.result !== 'deliverable') {
//         console.log("Invalid or non-existent email");
//         return NextResponse.json({ error: "Invalid or non-existent email" }, { status: 400 });
//       }
//     } catch (error) {
//       console.error("Error validating email:", error);
//       return NextResponse.json({ error: "Error during email validation" }, { status: 500 });
//     }

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email: data.email });
//     console.log("Existing User:", existingUser);
//     if (existingUser) {
//       console.log("Email already exists");
//       return NextResponse.json({ error: "Email already exists" }, { status: 400 });
//     }

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(data.password, 10);
//     console.log("Hashed Password:", hashedPassword);

//     const newUser = new User({
//       name: data.name,
//       email: data.email,
//       password: hashedPassword,
//       userType: data.userType,
//     });

//     await newUser.save();
//     console.log("User registered successfully", newUser);

//     return NextResponse.json({ message: "User registered", user: newUser }, { status: 201 });
//   } catch (error) {
//     console.error("Error in registration API route:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// export async function GET(req) {
//   // Your GET handler logic
// }




import { connectMongoDB } from "../../../lib/ConnectDb";
import { NextResponse } from "next/server";
import User from "../../../models/User";
import bcrypt from 'bcryptjs';
import axios from 'axios';

export async function POST(req) {
  console.log("Registration API Request Received");

  try {
    // Connect to MongoDB
    await connectMongoDB();
    console.log("Connected to MongoDB");

    // Parse incoming data from request
    const data = await req.json();
    console.log("Data received from registration request:", data);

    const { email, password, name, userType } = data;

    // Email validation using Kickbox API
    const kickboxApiKey = process.env.KICKBOX_API_KEY;
    const emailValidationUrl = `https://api.kickbox.com/v2/verify?email=${email}&apikey=${kickboxApiKey}`;

    try {
      const response = await axios.get(emailValidationUrl);
      const emailData = response.data;

      // Check if the email is deliverable
      if (emailData.result !== 'deliverable') {
        console.log("Invalid or non-existent email");
        return NextResponse.json({ error: "Invalid or non-existent email" }, { status: 400 });
      }
    } catch (error) {
      console.error("Error validating email:", error);
      return NextResponse.json({ error: "Error during email validation" }, { status: 500 });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    console.log("Existing User:", existingUser);
    if (existingUser) {
      console.log("Email already exists");
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Create a new user document with hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    // Save the new user to the database
    await newUser.save();
    console.log("User registered successfully", newUser);

    return NextResponse.json({ message: "User registered", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in registration API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  // Implement GET handler logic here if needed
}
