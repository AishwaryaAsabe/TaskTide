import { connectMongoDB } from '../../../lib/ConnectDb';
import Project from '../../../models/project';
import { verifyToken } from '../../../lib/jwt';
import Bid from '@/models/bid';
import User from '@/models/User';

// export async function POST(req) {
//     await connectMongoDB();
//     const token = req.headers.get('Authorization')?.split(' ')[1]; 

//     if (!token) {
//         return new Response(JSON.stringify({ message: 'Authorization token is required' }), { status: 401 });
//     }

//     try {
//         // Await the verification to get the actual user details
//         const verified = await verifyToken(token);

//         // Log verified information
//         console.log('Verified User:', verified);

//         const projectData = await req.json(); 

//         if (!projectData.title || !projectData.description || !projectData.budget ) {
//             return new Response(JSON.stringify({ message: 'Title, description, and budget are required' }), { status: 400 });
//         }

//         // Ensure clientId and clientName are being set
//         const project = new Project({
//             ...projectData,
//             clientId: verified.id, // Save the clientId with the project
//             clientName: verified.name // Save the clientName with the project
//         });

//         // Log the project being created
//         console.log('Creating Project:', project);

//         await project.save();
//         return new Response(JSON.stringify(project), { status: 201 });
//     } catch (error) {
//         console.error('Error posting project:', error); 
//         return new Response(JSON.stringify({ message: error.message || 'Internal Server Error' }), { status: 500 });
//     }
// }


// models/project.js
export async function POST(req) {
    await connectMongoDB();
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ message: 'Authorization token is required' }), { status: 401 });
    }

    try {
        const verified = await verifyToken(token);
        const projectData = await req.json();

        if (!projectData.title || !projectData.description || !projectData.budget || !projectData.biddingDuration) {
            return new Response(JSON.stringify({ message: 'Title, description, budget, and bidding duration are required' }), { status: 400 });
        }

        // Calculate the bidding deadline as 48 hours plus the entered days from the current time
        const biddingDuration = parseInt(projectData.biddingDuration, 10);
        const now = new Date();
        const biddingDeadline = new Date(now.getTime() + (biddingDuration * 24 * 60 * 60 * 1000) + (60 * 60 * 1000)); // days + 48 hours

        const project = new Project({
            title: projectData.title,
            description: projectData.description,
            budget: projectData.budget,
            biddingDeadline,
            clientId: verified.id,
            clientName: verified.name // Assuming clientName should come from the verified token
        });

        await project.save();
        return new Response(JSON.stringify(project), { status: 201 });
    } catch (error) {
        console.error('Error posting project:', error);
        return new Response(JSON.stringify({ message: error.message || 'Internal Server Error' }), { status: 500 });
    }
}








export async function GET(req) {
    await connectMongoDB();

    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ message: 'Authorization token is required' }), { status: 401 });
    }

    try {
        const decoded = await verifyToken(token);
        const isFreelancer = decoded.role === 'freelancer';

        const projects = isFreelancer
            ? await Project.find({}) // Freelancers see all projects
            : await Project.find({ clientId: decoded.id }); // Clients see only their projects

        // Fetch the bids and populate the freelancer details
        const projectsWithBids = await Promise.all(projects.map(async (project) => {
            const bids = await Bid.find({ projectId: project._id }).populate('freelancerId', 'name');
            return {
                ...project.toObject(),
                bids
            };
        }));

        return new Response(JSON.stringify(projectsWithBids), { status: 200 });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}




// New function to handle bid acceptance


// Function to send a notification to the freelancer (implement as needed)
;