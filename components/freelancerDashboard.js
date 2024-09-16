// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FreelancerDashboard = () => {
//     const [projects, setProjects] = useState([]);
//     const [error, setError] = useState(null);
//     const [bidAmounts, setBidAmounts] = useState({});
//     const [loading, setLoading] = useState(false);

//     const fetchProjects = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('/api/bids', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             console.log('Projects with Bid Status:', response.data);
//             setProjects(response.data);
//         } catch (error) {
//             console.error('Error fetching projects:', error);
//             setError('Failed to fetch projects');
//         }
//     };

//     const handleBidAmountChange = (projectId, value) => {
//         setBidAmounts(prev => ({ ...prev, [projectId]: value }));
//     };

//     const submitBid = async (projectId, description) => {
//         const bidAmount = bidAmounts[projectId]?.trim();
//         const parsedBidAmount = parseFloat(bidAmount);

//         if (isNaN(parsedBidAmount) || parsedBidAmount <= 0) {
//             setError('Please enter a valid bid amount.');
//             return;
//         }

//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post('/api/bids', { projectId, amount: parsedBidAmount, description }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             if (response.data.accepted) {
//                 setProjects(prevProjects =>
//                     prevProjects.map(project =>
//                         project._id === projectId
//                             ? { ...project, acceptedBid: projectId }
//                             : project
//                     )
//                 );
//             }

//             setBidAmounts(prev => ({ ...prev, [projectId]: '' }));
//             setError(null);
//             fetchProjects(); // Refresh projects after bid submission
//         } catch (error) {
//             console.error('Error submitting bid:', error);
//             setError('Failed to submit bid');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-900 py-8 flex flex-col justify-center sm:py-12">
//             <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
//                 <div className="relative px-6 py-10 bg-gray-800 shadow-lg sm:rounded-lg sm:p-20">
//                     <h1 className="text-4xl font-bold text-center text-white">Freelancer Dashboard</h1>
//                     {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//                     <h2 className="mt-8 text-2xl font-semibold text-teal-400">Available Projects</h2>
//                     <div className="mt-6 max-h-96 overflow-y-auto space-y-6 scrollbar-hide">

//                         {projects.length > 0 ? (
//                             projects.map(project => (
//                                 <div key={project._id} className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
//                                     <h3 className="text-2xl font-semibold text-teal-300">{project.title}</h3>
//                                     <p className="mt-4 text-gray-300">{project.description}</p>
//                                     <p className="mt-4 font-medium text-teal-400">Budget: ${project.budget}</p>
//                                     <p className="mt-4 font-medium text-teal-400">
//                                         Client: {project.clientId ? project.clientId.name : 'Unknown'}
//                                     </p>
//                                     {project.bidSubmitted ? (
//                                         <>
//                                             <p className="mt-4 text-green-400 font-semibold">Bid Submitted</p>
//                                             {project.acceptedBid && (
//                                                 <p className="mt-4 text-blue-400 font-semibold">Congratulations! Your bid has been accepted by the client.</p>
//                                             )}
//                                         </>
//                                     ) : (
//                                         <>
//                                             <input
//                                                 type="number"
//                                                 placeholder="Your Bid Amount"
//                                                 className="mt-4 p-3 border border-gray-600 rounded-md w-full bg-gray-800 text-white"
//                                                 value={bidAmounts[project._id] || ''}
//                                                 onChange={(e) => handleBidAmountChange(project._id, e.target.value)}
//                                             />
//                                             <button
//                                                 className="mt-4 w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
//                                                 onClick={() => submitBid(project._id, project.description)}
//                                                 disabled={loading}
//                                             >
//                                                 {loading ? 'Submitting...' : 'Submit Bid'}
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-gray-400 text-center">No projects available.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FreelancerDashboard;





"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FreelancerDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [bidAmounts, setBidAmounts] = useState({});
    const [loading, setLoading] = useState(false);
    const [timers, setTimers] = useState({}); // For live countdown timers


    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/bids', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Projects with Bid Status:', response.data);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to fetch projects');
        }
    };

    const handleBidAmountChange = (projectId, value) => {
        setBidAmounts(prev => ({ ...prev, [projectId]: value }));
    };

    const submitBid = async (projectId, description) => {
        const bidAmount = bidAmounts[projectId]?.trim();
        const parsedBidAmount = parseFloat(bidAmount);

        if (isNaN(parsedBidAmount) || parsedBidAmount <= 0) {
            setError('Please enter a valid bid amount.');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/bids', { projectId, amount: parsedBidAmount, description }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.accepted) {
                setProjects(prevProjects =>
                    prevProjects.map(project =>
                        project._id === projectId
                            ? { ...project, acceptedBid: projectId }
                            : project
                    )
                );
            }

            setBidAmounts(prev => ({ ...prev, [projectId]: '' }));
            setError(null);
            fetchProjects(); // Refresh projects after bid submission
        } catch (error) {
            console.error('Error submitting bid:', error);
            setError('Failed to submit bid');
        } finally {
            setLoading(false);
        }
    };

    const isBiddingOpen = (biddingDeadline) => {
        const currentTime = new Date();
        const deadline = new Date(biddingDeadline);
        return currentTime < deadline; // Check if current time is before the deadline
    };

    // Format time remaining for countdown
    
    const calculateTimeLeft = (deadline) => {
        const now = new Date();
        const end = new Date(deadline);
        const difference = end - now;

        if (difference <= 0) {
            return { expired: true, timeLeft: "Expired" };
        }

        const timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };

        return { expired: false, timeLeft };
    };

    useEffect(() => {
        fetchProjects();

        const interval = setInterval(() => {
            setProjects(prevProjects => prevProjects.map(project => {
                const { expired, timeLeft } = calculateTimeLeft(project.biddingDeadline);
                return { ...project, timeLeft, expired };
            }));
        }, 1000);

        return () => clearInterval(interval); // Clear the interval when the component is unmounted
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 py-8 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
                <div className="relative px-6 py-10 bg-gray-800 shadow-lg sm:rounded-lg sm:p-20">
                    <h1 className="text-4xl font-bold text-center text-white">Freelancer Dashboard</h1>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    <h2 className="mt-8 text-2xl font-semibold text-teal-400">Available Projects</h2>
                    <div className="mt-6 max-h-96 overflow-y-auto space-y-6 scrollbar-hide">
                        {projects.length > 0 ? (
                            projects.map(project => {
                                const { expired, timeLeft } = calculateTimeLeft(project.biddingDeadline);
                                const biddingOpen = !expired;
                                return (
                                    <div key={project._id} className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                        <h3 className="text-2xl font-semibold text-teal-300">{project.title}</h3>
                                        <p className="mt-4 text-gray-300">{project.description}</p>
                                        <p className="mt-4 font-medium text-teal-400">Budget: ${project.budget}</p>
                                        <p className="mt-4 font-medium text-teal-400">
                                            Client: {project.clientId ? project.clientId.name : 'Unknown'}
                                        </p>
                                        <p className="mt-4 font-medium text-yellow-400">
                                            Bidding Deadline: {biddingOpen ? `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s` : 'Expired'}
                                        </p>

                                        {project.bidSubmitted ? (
                                            <>
                                                <p className="mt-4 text-green-400 font-semibold">Bid Submitted</p>
                                                {project.acceptedBid && (
                                                    <p className="mt-4 text-blue-400 font-semibold">Congratulations! Your bid has been accepted by the client.</p>
                                                )}
                                            </>
                                        ) : biddingOpen ? (
                                            <>
                                                <input
                                                    type="number"
                                                    placeholder="Your Bid Amount"
                                                    className="mt-4 p-3 border border-gray-600 rounded-md w-full bg-gray-800 text-white"
                                                    value={bidAmounts[project._id] || ''}
                                                    onChange={(e) => handleBidAmountChange(project._id, e.target.value)}
                                                />
                                                <button
                                                    className="mt-4 w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
                                                    onClick={() => submitBid(project._id, project.description)}
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Submitting...' : 'Submit Bid'}
                                                </button>
                                            </>
                                        ) : (
                                            <p className="mt-4 text-red-400 font-semibold">Bidding Closed</p>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-400 text-center">No projects available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerDashboard;
