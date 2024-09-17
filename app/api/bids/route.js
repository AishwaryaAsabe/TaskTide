import mongoose from 'mongoose';
import Bid from '../../../models/bid';
import Project from '../../../models/project'; // Assuming you have a Project model
import { connectMongoDB } from '../../../lib/ConnectDb';
import { verifyToken } from '../../../lib/jwt';

// Handle POST requests to submit a new bid
// export async function POST(req) {
//     try {
//         await connectMongoDB();

//         const { projectId, amount, description } = await req.json();
//         const token = req.headers.get("Authorization")?.split(" ")[1];
//         const decoded = await verifyToken(token);

//         if (!decoded || !decoded.id) {
//             return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
//         }

//         // Fetch the project to get clientId and clientName
//         const project = await Project.findById(projectId).lean();
//         if (!project) {
//             return new Response(JSON.stringify({ message: "Project not found" }), { status: 404 });
//         }

//         const newBid = new Bid({
//             projectId: new mongoose.Types.ObjectId(projectId),
//             freelancerId: new mongoose.Types.ObjectId(decoded.id),
//             clientId: project.clientId, // Set clientId from the project
//             clientName: project.clientName || "Unknown", // Set clientName from the project or default to "Unknown"
//             amount,
//             description,
//             freelancerName: verified.name // Assuming clientName should come from the verified token
//         });

//         await newBid.save();
//         return new Response(JSON.stringify(newBid), { status: 201 });
//     } catch (error) {
//         console.error('Error submitting bid:', error);
//         return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
//     }
// }


export async function POST(req) {
    try {
        await connectMongoDB();

        const { projectId, amount, description } = await req.json();
        const token = req.headers.get("Authorization")?.split(" ")[1];
        const decoded = await verifyToken(token);

        if (!decoded || !decoded.id) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        // Fetch the project to get clientId and clientName
        const project = await Project.findById(projectId).lean();
        if (!project) {
            return new Response(JSON.stringify({ message: "Project not found" }), { status: 404 });
        }

        const newBid = new Bid({
            projectId: new mongoose.Types.ObjectId(projectId),
            freelancerId: new mongoose.Types.ObjectId(decoded.id),
            clientId: project.clientId, // Set clientId from the project
            clientName: project.clientName || "Unknown", // Set clientName from the project or default to "Unknown"
            amount,
            description,
            freelancerName: decoded.name || "Anonymous" // Set freelancerName from the decoded token or default to "Anonymous"
        });

        await newBid.save();
        return new Response(JSON.stringify(newBid), { status: 201 });
    } catch (error) {
        console.error('Error submitting bid:', error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}



// Handle GET requests to fetch projects and mark bids submitted by the freelancer
// Handle GET requests to fetch projects and mark bids submitted by the freelancer
export async function GET(req) {
    try {
        await connectMongoDB();

        const token = req.headers.get("Authorization")?.split(" ")[1];
        const decoded = await verifyToken(token);

        if (!decoded || !decoded.id) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const projects = await Project.find()
            .populate('clientId', 'name') // Populate clientId with the user's name
            .lean();

        const bids = await Bid.find({ freelancerId: decoded.id })
            .populate('clientId', 'name') // Populate clientId with the user's name
            .lean();

        const projectsWithBidStatus = projects.map(project => {
            const bidSubmitted = bids.some(bid => bid.projectId.toString() === project._id.toString());
            return { ...project, bidSubmitted };
        });

        return new Response(JSON.stringify(projectsWithBidStatus), { status: 200 });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}



// Handle PATCH requests to accept a bid
// Handle PATCH requests to accept a bid
export async function PATCH(req) {
    try {
        await connectMongoDB();

        const { projectId, bidId } = await req.json();
        const token = req.headers.get("Authorization")?.split(" ")[1];
        const decoded = await verifyToken(token);

        if (!decoded || !decoded.id) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        // Mark the bid as accepted in the bids collection
        const bid = await Bid.findByIdAndUpdate(bidId, { bidAccepted: true }, { new: true });
        if (!bid) {
            return new Response(JSON.stringify({ message: "Bid not found" }), { status: 404 });
        }

        // Update the project with the accepted bid in the projects collection
        const project = await Project.findByIdAndUpdate(
            projectId,
            { acceptedBid: bidId },
            { new: true }
        );

        if (!project) {
            return new Response(JSON.stringify({ message: "Project not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Bid accepted successfully", bid, project }), { status: 200 });
    } catch (error) {
        console.error('Error accepting bid:', error);
        return new Response(JSON.stringify({ message: error.message || "Internal Server Error" }), { status: 500 });
    }
}






