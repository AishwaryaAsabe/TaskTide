// app/dashboard/[userType]/page.js
"use client"; // Make sure this is a client component

import React from 'react';
import { useRouter } from 'next/navigation';
import ClientDashboard from '../../../components/clientDashboard';
import FreelancerDashboard from '../../../components/freelancerDashboard';

const UserDashboard = ({ params }) => {
    const { userType } = params; // Get the userType from the params

    return (
        <div>
            <h1>{userType === 'client' ? 'Client Dashboard' : 'Freelancer Dashboard'}</h1>
            {userType === 'client' ? <ClientDashboard /> : <FreelancerDashboard />}
        </div>
    );
};

export default UserDashboard;
