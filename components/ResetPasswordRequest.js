// // pages/reset-password.js
// "use client";
// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'sonner';

// const ResetPasswordRequest = () => {
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/ResetPasswordRequest", { email });
//       if (res.status === 200) {
//         toast.success('Password reset email sent successfully!');
//       }
//     } catch (error) {
//       toast.error('Error sending reset email. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Reset Password</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-500"
//           >
//             Send Reset Link
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordRequest;




// pages/reset-password.js
"use client";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'; // Import useRouter

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/ResetPasswordRequest", { email });
      if (res.status === 200) {
        toast.success('Password reset email sent successfully!');
      }
    } catch (error) {
      toast.error('Error sending reset email. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-500"
            >
              Send Reset Link
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
