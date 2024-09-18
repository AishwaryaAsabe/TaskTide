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



import Bid from '../../../models/bid';
import { connectMongoDB } from '../../../lib/ConnectDb';

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Aggregate top freelancers based on the number of accepted bids
    const topFreelancers = await Bid.aggregate([
      { $match: { bidAccepted: true } },
      {
        $group: {
          _id: '$freelancerId',
          acceptedBids: { $sum: 1 },
        },
      },
      { $sort: { acceptedBids: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'freelancerInfo',
        },
      },
      { $unwind: '$freelancerInfo' },
      {
        $project: {
          acceptedBids: 1,
          'freelancerInfo.name': 1,
          'freelancerInfo.bio': 1,
          'freelancerInfo.profileImage': 1,
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
