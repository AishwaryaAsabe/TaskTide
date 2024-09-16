"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get('/api/top-freelancers');
        setFreelancers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top freelancers:', error);
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Top Freelancers of the Day</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <div
            key={freelancer._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            <Image
              src={freelancer.freelancerInfo.profileImage || '/default-profile.png'}
              alt={`${freelancer.freelancerInfo.name}'s profile`}
              className="w-24 h-24 rounded-full mb-4"
              width={96} // Specify width
              height={96} // Specify height
              objectFit="cover" // Ensures image maintains aspect ratio and covers the area
            />
            <h2 className="text-2xl font-semibold mb-2">{freelancer.freelancerInfo.name}</h2>
            <p className="text-gray-700 mb-4">{freelancer.acceptedBids} Accepted Bids</p>
            <p className="text-gray-500">{freelancer.freelancerInfo.bio || 'No bio available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
