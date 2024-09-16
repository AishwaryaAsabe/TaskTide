// "use client"; // This makes this component a client component

// import React, { useState, useEffect } from 'react';
// import { Link, Button } from '@nextui-org/react';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is logged in by checking the token
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token); // Set isLoggedIn based on token presence
//   }, []); // Empty dependency array ensures this runs once on component mount

//   const handleLogout = () => {
//     // Clear user data from localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('name');

//     // Update state
//     setIsLoggedIn(false);

//     // Show a success message
//     toast.success('Logged out successfully!');

//     // Redirect to login page
//     router.push('/login');
//   };

//   return (
//     <nav className="flex justify-between items-center p-4 bg-gray-800 text-teal-400">
//       <div className="flex items-center">
//         <span className="font-bold text-lg">TaskTide</span>
//       </div>

//       <div className="flex space-x-4">
//         {isLoggedIn ? (
//           <Button
//             className="bg-teal-600 hover:bg-teal-500 text-white p-2 rounded transition-colors duration-300"
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         ) : (
//           <>
//             <Link
//               className="hover:bg-gray-700 hover:text-teal-300 p-2 rounded transition-colors duration-300"
//               href="/login"
//             >
//               Login
//             </Link>
//             <Button
//               as={Link}
//               className="bg-teal-600 hover:bg-teal-500 text-white p-2 rounded transition-colors duration-300"
//               href="/register"
//               variant="flat"
//             >
//               Sign Up
//             </Button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }



"use client"; // This makes this component a client component

import React, { useState, useEffect } from 'react';
import { Link, Button } from '@nextui-org/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa'; // Example profile icon

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); // To store user type (client or freelancer)
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and retrieve user type
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType'); // Assuming userType is stored in localStorage
    setIsLoggedIn(!!token);
    setUserType(userType || ''); // Set userType from localStorage
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');

    // Update state
    setIsLoggedIn(false);

    // Show a success message
    toast.success('Logged out successfully!');

    // Redirect to login page
    router.push('/login');
  };

  // Determine profile link based on user type
  const profileLink = userType === 'client' ? '/client/profile' : '/freelancer/profile';

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-teal-400">
      <div className="flex items-center">
        <span className="font-bold text-lg">TaskTide</span>
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link
              className="flex items-center hover:bg-gray-700 hover:text-teal-300 p-2 rounded transition-colors duration-300"
              href={profileLink}
            >
              <FaUserCircle className="text-xl mr-2" /> Profile
            </Link>
            <Button
              className="bg-teal-600 hover:bg-teal-500 text-white p-2 rounded transition-colors duration-300"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link
              className="hover:bg-gray-700 hover:text-teal-300 p-2 rounded transition-colors duration-300"
              href="/login"
            >
              Login
            </Link>
            <Button
              as={Link}
              className="bg-teal-600 hover:bg-teal-500 text-white p-2 rounded transition-colors duration-300"
              href="/register"
              variant="flat"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

