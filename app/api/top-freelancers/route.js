// import Bid from '../../../models/bid';
// import { connectMongoDB } from '../../../lib/ConnectDb';

// export async function GET(req) {
//   try {
//     // Connect to MongoDB
//     await connectMongoDB();

//     // Aggregate top freelancers based on the number of accepted bids
//     const topFreelancers = await Bid.aggregate([
//       { $match: { bidAccepted: true } }, // Only consider accepted bids
//       {
//         $group: {
//           _id: '$freelancerId', // Group by freelancerId
//           acceptedBids: { $sum: 1 }, // Count the number of accepted bids
//         },
//       },
//       { $sort: { acceptedBids: -1 } }, // Sort by the most accepted bids
//       { $limit: 6 }, // Limit to top 6 freelancers
//       {
//         $lookup: {
//           from: 'users', // Join with the 'users' collection
//           localField: '_id',
//           foreignField: '_id',
//           as: 'freelancerInfo', // Store the result in 'freelancerInfo'
//         },
//       },
//       { $unwind: '$freelancerInfo' }, // Unwind to retrieve a single freelancer's info
//       {
//         $project: {
//           acceptedBids: 1,
//           'freelancerInfo.name': 1,
//           'freelancerInfo.bio': 1,
//           'freelancerInfo.skills': 1,
//           'freelancerInfo.profileImage': 1 // Include the profile image URL
//         },
//       },
//     ]);

//     // Return the response with the top freelancers
//     return new Response(JSON.stringify(topFreelancers), { status: 200 });
//   } catch (error) {
//     console.error('Error fetching top freelancers:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch top freelancers' }), { status: 500 });
//   }
// }



// import Bid from '../../../models/bid';
// import { connectMongoDB } from '../../../lib/ConnectDb';

// export async function GET(req) {
//   try {
//     // Connect to MongoDB
//     await connectMongoDB();

//     // Aggregate top freelancers based on the number of accepted bids
//     const topFreelancers = await Bid.aggregate([
//       { $match: { bidAccepted: true } },
//       {
//         $group: {
//           _id: '$freelancerId',
//           acceptedBids: { $sum: 1 },
//         },
//       },
//       { $sort: { acceptedBids: -1 } },
//       { $limit: 6 },
//       {
//         $lookup: {
//           from: 'users',
//           localField: '_id',
//           foreignField: '_id',
//           as: 'freelancerInfo',
//         },
//       },
//       { $unwind: '$freelancerInfo' },
//       {
//         $project: {
//           acceptedBids: 1,
//           'freelancerInfo.name': 1,
//           'freelancerInfo.bio': 1,
//           'freelancerInfo.profileImage': 1,
//         },
//       },
//     ]);

//     // If no top freelancers found, return an empty array
//     return new Response(JSON.stringify(topFreelancers || []), { status: 200 });
//   } catch (error) {
//     console.error('Error fetching top freelancers:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch top freelancers' }), { status: 500 });
//   }
// }

import Bid from '../../../models/bid'; // Import the Bid model
import { connectMongoDB } from '../../../lib/ConnectDb'; // MongoDB connection

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Aggregate top freelancers based on the number of accepted bids
    const topFreelancers = await Bid.aggregate([
      // Match only accepted bids
      { $match: { bidAccepted: true } },
      // Group by freelancerId and count the accepted bids
      {
        $group: {
          _id: '$freelancerId', // Group by freelancerId
          acceptedBids: { $sum: 1 }, // Count accepted bids
        },
      },
      // Sort freelancers by the number of accepted bids (highest first)
      { $sort: { acceptedBids: -1 } },
      // Limit to top 6 freelancers
      { $limit: 6 },
      // Lookup the freelancer's details from the User schema
      {
        $lookup: {
          from: 'users', // Name of the User collection in MongoDB
          localField: '_id', // Use freelancerId from Bid schema
          foreignField: '_id', // Match against _id field in User collection
          as: 'freelancerInfo', // The alias for the joined data from User collection
        },
      },
      // Unwind the freelancerInfo array (since lookup results in an array)
      { $unwind: '$freelancerInfo' },
      // Project only the fields we want in the result
      {
        $project: {
          acceptedBids: 1, // Include number of accepted bids
          'freelancerInfo.name': 1, // Include freelancer's name
          'freelancerInfo.bio': 1, // Include freelancer's bio
          'freelancerInfo.profileImage': 1, // Include freelancer's profile image
        },
      },
    ]);

    // If no top freelancers found, return an empty array
    return new Response(JSON.stringify(topFreelancers || []), { status: 200 });
  } catch (error) {
    console.error('Error fetching top freelancers:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch top freelancers' }), { status: 500 });
  }
}
