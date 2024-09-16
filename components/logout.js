"use client"; // Ensure this is a client-side script

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');

    // Optionally, show a success message
    toast.success('Logged out successfully!');

    // Redirect to login page or another page
    router.push('/login');
  }, [router]);

  return null; // This component does not render anything
};

export default Logout;
