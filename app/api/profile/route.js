// nextapp/app/api/profile/route.js

import { connectMongoDB } from '../../../lib/ConnectDb';
import User from '../../../models/User';

export async function GET(req) {
  await connectMongoDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
  }

  try {
    const user = await User.findById(userId).select('-password'); // Don't return password
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching profile' }), { status: 500 });
  }
}

// nextapp/app/api/profile/route.js

// export async function POST(req) {
//   await connectMongoDB();
  
//   const { userId, clientInfo, freelancerInfo } = await req.json();

//   if (!userId) {
//     return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
//   }

//   try {
//     const updateData = {};

//     if (clientInfo) updateData.clientInfo = clientInfo;
//     if (freelancerInfo) updateData.freelancerInfo = freelancerInfo;

//     if (image) {
//       // Save the image URL in the profileImage field
//       updateData.profileImage = image;
//     }

    
//     const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

//     if (!updatedUser) {
//       return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
//     }

//     return new Response(JSON.stringify(updatedUser), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Error updating profile' }), { status: 500 });
//   }
// }



// export async function POST(req) {
//   await connectMongoDB();
  
//   const { userId, clientInfo, freelancerInfo, profileImage ,bio} = await req.json(); // Expect profileImage

//   if (!userId) {
//     return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
//   }

//   try {
//     const updateData = {};

//     if (clientInfo) updateData.clientInfo = clientInfo;
//     if (freelancerInfo) updateData.freelancerInfo = freelancerInfo;
//     if (profileImage) updateData.profileImage = profileImage; // Save the image URL
//     if (bio) updateData.bio = bio; // Save the image URL


//     const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

//     if (!updatedUser) {
//       return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
//     }

//     return new Response(JSON.stringify(updatedUser), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Error updating profile' }), { status: 500 });
//   }
// }


// export async function POST(req) {
//   await connectMongoDB();
  
//   const { userId, clientInfo, freelancerInfo, profileImage, bio } = await req.json(); // Expect profileImage

//   if (!userId) {
//     return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
//   }

//   try {
//     const user = await User.findById(userId); // Find the user by ID

//     if (!user) {
//       return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
//     }

//     const updateData = {};

//     // Update based on user type (client or freelancer)
//     if (user.userType === 'client' && clientInfo) {
//       updateData.clientInfo = clientInfo;
//     } else if (user.userType === 'freelancer' && freelancerInfo) {
//       updateData.freelancerInfo = freelancerInfo;
//     }

//     if (profileImage) updateData.profileImage = profileImage; // Update profile image
//     if (bio) updateData.bio = bio; // Update bio

//     const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

//     return new Response(JSON.stringify(updatedUser), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Error updating profile' }), { status: 500 });
//   }
// }



export async function POST(req) {
  await connectMongoDB();
  
  const { userId, clientInfo, freelancerInfo, profileImage, bio } = await req.json(); // Expect profileImage

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
  }

  try {
    const user = await User.findById(userId); // Find the user by ID

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const updateData = {};

    // Update based on user type (client or freelancer)
    if (user.userType === 'client' && clientInfo) {
      updateData.clientInfo = clientInfo;
    } else if (user.userType === 'freelancer' && freelancerInfo) {
      updateData.freelancerInfo = freelancerInfo;
    }

    if (profileImage) updateData.profileImage = profileImage; // Update profile image
    if (bio) updateData.bio = bio; // Update bio

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating profile' }), { status: 500 });
  }
}

