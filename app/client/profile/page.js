// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'sonner'; 

// export default function ClientProfile() {
//   const [profile, setProfile] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editable, setEditable] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [isFormDirty, setIsFormDirty] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userId = localStorage.getItem('userId');
//       try {
//         const response = await axios.get(`/api/profile?userId=${userId}`);
//         setProfile(response.data);
//         setFormData(response.data.clientInfo || {});
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         setError('Failed to load profile');
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setIsFormDirty(true); // Mark form as dirty when changes occur
//   };

//   const handleCancel = () => {
//     setEditable(false);
//     setFormData(profile.clientInfo || {});
//     setIsFormDirty(false); // Reset dirty state
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem('userId');
//     console.log('Profile update started'); // Debugging

//     toast.success("Profile update started!");

//     try {
//       await axios.post('/api/profile', { userId, clientInfo: formData });
//       setProfile((prev) => ({ ...prev, clientInfo: formData }));
//       console.log('Profile updated successfully'); // Debugging
//       toast.success('Profile updated successfully!');
//       setEditable(false);
//       setIsFormDirty(false); // Reset dirty state
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Failed to update profile');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container mx-auto p-6 max-w-lg">
//       <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">Client Profile</h1>
//       <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={profile.name || ''}
//             disabled
//             className="mt-1 block w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
//           <input
//             type="text"
//             name="email"
//             value={profile.email || ''}
//             disabled
//             className="mt-1 block w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address || ''}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             disabled={!editable}
//           />
//         </div>


//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</label>
//           <input
//             type="number"
//             name="phone"
//             value={formData.phone || ''}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             disabled={!editable}
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Company</label>
//           <input
//             type="text"
//             name="company"
//             value={formData.company || ''}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             disabled={!editable}
//           />
//         </div>

//         <div className="flex justify-between mt-4">
//           {editable ? (
//             <>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                 disabled={!isFormDirty} // Disable Save if form is not dirty
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-md"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               type="button"
//               onClick={() => setEditable(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }



















"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner"; // Import toast from sonner

export default function ClientProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [image, setImage] = useState(null); // To hold the image file
  const [imageUrl, setImageUrl] = useState(""); // To display the image

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`/api/profile?userId=${userId}`);
        setProfile(response.data);
        setFormData(response.data.clientInfo || {});
        setImageUrl(response.data.profileImage || ""); // Set the image URL if available
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormDirty(true); // Mark form as dirty when changes occur
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setIsFormDirty(true); // Mark form as dirty if an image is selected
  };

  const handleCancel = () => {
    setEditable(false);
    setFormData(profile.clientInfo || {});
    setImage(null); // Reset the image file on cancel
    setIsFormDirty(false); // Reset dirty state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
  
    try {
      let uploadedImageUrl = imageUrl;
  
      // Upload image if a new one is selected
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "pandacloud1");
  
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/pandacloud1/image/upload",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
  
        uploadedImageUrl = response.data.secure_url; // Get the uploaded image URL
        setImageUrl(uploadedImageUrl); // Update UI immediately with the new image URL
      }
  
      // Now update the profile with form data and the new image URL
      await axios.post("/api/profile", {
        userId,
        clientInfo: {
          ...formData, // Include freelancerInfo fields
          bio: formData.bio || "" // Ensure bio is included here
        },
        profileImage: uploadedImageUrl, // Use the uploaded image URL or the existing one
      });
  
      setProfile((prev) => ({
        ...prev,
        clientInfo: formData,
        bio: formData.bio || "", // Ensure bio is updated in the profile
        profileImage: uploadedImageUrl,
      }));
      
      // Reset the form after success
      setFormData(formData);
      setEditable(false);
      toast.success("Profile updated successfully!"); // Show toast after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Client Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              disabled
              className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              disabled={!editable}
              className="mt-1 block w-full"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Profile Image"
                className="mt-2 w-32 h-32 object-cover rounded-full" // Make image circular
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ""}
              disabled
              className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              disabled={!editable}
              className={`mt-1 block w-full px-4 py-2 border ${
                editable ? "border-blue-500" : "border-gray-300"
              } rounded-md`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="number"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              disabled={!editable}
              className={`mt-1 block w-full px-4 py-2 border ${
                editable ? "border-blue-500" : "border-gray-300"
              } rounded-md`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company || ""}
              onChange={handleChange}
              disabled={!editable}
              className={`mt-1 block w-full px-4 py-2 border ${
                editable ? "border-blue-500" : "border-gray-300"
              } rounded-md`}
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-700">Bio</label>
            <input
              type="text"
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              disabled={!editable}
              className={`mt-1 block w-full px-4 py-2 border ${
                editable ? "border-blue-500" : "border-gray-300"
              } rounded-md`}
            />
          </div>

          <div className="flex justify-between mt-4">
            {editable ? (
              <>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  disabled={!isFormDirty} // Disable Save if form is not dirty
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditable(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
