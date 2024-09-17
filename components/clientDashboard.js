


"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function ClientDashboard() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', description: '', budget: '', biddingDuration: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [clientId, setClientId] = useState(null);
    const [timer, setTimer] = useState(Date.now()); // Timer state for triggering re-renders

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setClientId(userId);
        fetchProjects();

        // Set up a live timer to update every second
        const interval = setInterval(() => {
            setTimer(Date.now()); // Re-trigger component every second
        }, 1000);

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    const fetchProjects = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('/api/projects', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to fetch projects');
        }
    };

    const postProject = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/projects', newProject, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success('Project posted successfully');
            setNewProject({ title: '', description: '', budget: '', biddingDuration: '' });
            fetchProjects(); // Refresh the list of projects
        } catch (error) {
            console.error('Error posting project:', error);
            setError('Failed to post project');
        }
    };

    const acceptBid = async (projectId, bidId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch('/api/bids', {
                projectId,
                bidId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(response.data.message);
            setLoading(false);
            fetchProjects(); // Refresh the list of projects
        } catch (error) {
            console.error('Error accepting bid:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({ ...prev, [name]: value }));
    };

    const formatTimeLeft = (deadline) => {
        const now = new Date();
        const end = new Date(deadline);

        if (isNaN(end.getTime())) return 'Invalid Date'; // Check if date parsing was successful

        const timeDiff = end - now;

        if (timeDiff <= 0) return 'Expired';

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Heading */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white text-center">
                        Client Dashboard
                    </h1>
                    <p className="text-gray-300 text-center mt-2">
                        Manage your projects and bids with ease.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Post New Project */}
                    <div className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-600">
                        <h2 className="text-2xl font-semibold text-teal-400 mb-6">
                            Post a New Project
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">
                                    Title
                                </label>
                                <input
                                    style={{ height: "40px" }}
                                    type="text"
                                    name="title"
                                    value={newProject.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-white shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    name="description"
                                    value={newProject.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-white shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">
                                    Bidding Duration (days)
                                </label>
                                <input
                                    type="number"
                                    name="biddingDuration"
                                    value={newProject.biddingDuration}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-white shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    style={{ height: "40px" }}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">
                                    Budget ($)
                                </label>
                                <input
                                    type="number"
                                    style={{ height: "40px" }}
                                    name="budget"
                                    value={newProject.budget}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-white shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={postProject}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                Post Project
                            </button>
                            {error && (
                                <p className="text-red-500 text-center mt-4">{error}</p>
                            )}
                        </form>
                    </div>

                    {/* Your Projects */}
                    <div className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-600">
                        <h2 className="text-2xl font-semibold text-teal-400 mb-6">
                            Your Projects
                        </h2>
                        <div className="mt-6 max-h-96 overflow-y-auto space-y-6 scrollbar-hide">
                            {loading ? (
                                <p className="text-center text-gray-500">Loading...</p>
                            ) : projects.length > 0 ? (
                                projects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="border border-gray-700 rounded-lg mb-6 p-4"
                                    >
                                        <h3 className="text-lg font-medium text-teal-300">
                                            {project.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-400">
                                            {project.description}
                                        </p>
                                        <p className="mt-2 text-sm text-gray-400 font-medium">
                                            Budget: ${project.budget}
                                        </p>
                                        <p className="mt-2 text-sm text-gray-400 font-medium">
                                            Bidding Deadline:{" "}
                                            {formatTimeLeft(project.biddingDeadline)}
                                        </p>
                                        <div className="mt-4">
                                            <h4 className="text-md font-semibold text-teal-200">
                                                Bids
                                            </h4>
                                            {project.bids.length > 0 ? (

projects.map((project) => (
    <div key={project._id} className="border border-gray-700 rounded-lg mb-6 p-4">
        <h3 className="text-lg font-medium text-teal-300">{project.title}</h3>
        <p className="mt-1 text-sm text-gray-400">{project.description}</p>
        <p className="mt-2 text-sm text-gray-400 font-medium">Budget: ${project.budget}</p>
        <p className="mt-2 text-sm text-gray-400 font-medium">
        Bidding Deadline: {formatTimeLeft(project.biddingDeadline)}
    </p>
        <div className="mt-4">
            <h4 className="text-md font-semibold text-teal-200">Bids</h4>
            {project.bids.length > 0 ? (
                project.bids.map(bid => (
                    <div key={bid._id} className="mt-2 p-3 bg-gray-700 rounded-lg shadow-inner border border-gray-600">
                        <p className="text-sm font-medium text-teal-400">
                            Freelancer: {bid.freelancerId ? bid.freelancerId.name : 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-300">Amount: ${bid.amount}</p>
                        <p className="text-sm text-gray-300">Description: {bid.description}</p>
                        {!project.acceptedBid ? (
                            <button
                                onClick={() => acceptBid(project._id, bid._id)}
                                className="mt-2 text-sm text-teal-400 hover:text-teal-300"
                            >
                                Accept Bid
                            </button>
                        ) : project.acceptedBid === bid._id ? (
                            <p className="text-green-400 mt-2">Bid Accepted</p>
                        ) : null}
                    </div>
                ))
            ) : (
                <p className="text-sm text-gray-300">No bids submitted yet.</p>
            )}
        </div>
    </div>
))
                                                // project.bids.map((bid) => (
                                                //     <div
                                                //         key={bid._id}
                                                //         className="mt-2 bg-gray-900 p-2 rounded-md border border-gray-600"
                                                //     >
                                                //         <p className="text-gray-300">
                                                //             {bid.bidderName}: ${bid.amount}
                                                //         </p>
                                                //         <button
                                                //             onClick={() => acceptBid(project._id, bid._id)}
                                                //             className="mt-2 text-sm text-teal-400 hover:underline"
                                                //         >
                                                //             Accept Bid
                                                //         </button>
                                                //     </div>
                                                // ))
                                            ) : (
                                                <p className="text-gray-500">No bids yet</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No projects found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
