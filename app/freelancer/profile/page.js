// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "sonner"; // Import toast from sonner

// export default function FreelancerProfile() {
//   const [profile, setProfile] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editable, setEditable] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [isFormDirty, setIsFormDirty] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userId = localStorage.getItem("userId");
//       try {
//         const response = await axios.get(`/api/profile?userId=${userId}`);
//         setProfile(response.data);
//         setFormData(response.data.freelancerInfo || {});
//         setImageUrl(response.data.profileImage || ""); // Set the image URL if available

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setError("Failed to load profile");
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     // Track if form data is changed
//     setIsFormDirty(
//       JSON.stringify(formData) !== JSON.stringify(profile.freelancerInfo)
//     );
//   }, [formData, profile.freelancerInfo]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");

//     // Show success toast immediately
//     toast.success("Profile update started!");

//     try {


//       let imageUrl = "";

//       if (image) {
//         const formData = new FormData();
//         data.append("file", image);
//        data.append("upload_preset", "insta-clone");
//         data.append("cloud_name", "pandacloud1"); // Optional, if you are using upload presets

//         const response = await axios.post(
//           "https://api.cloudinary.com/v1_1/pandacloud1/image/upload",
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );

//         imageUrl = response.data.secure_url; // Get the URL of the uploaded image
//       }
//       // Perform the API call to update profile
//       await axios.post("/api/profile", { userId, freelancerInfo: formData ,profileImage: imageUrl  });
//       setProfile((prev) => ({ ...prev, freelancerInfo: formData }));
//       toast.success("Profile updated successfully!");
//       setEditable(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile");
//     }
//   };

//   const handleCancel = () => {
//     setEditable(false);
//     setFormData(profile.freelancerInfo || {});
//   };

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
//         <h2 className="text-2xl font-bold mb-4">Freelancer Profile</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={profile.name || ""}
//               disabled
//               className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md px-4 py-2"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Profile Image</label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               disabled={!editable}
//               className="mt-1 block w-full"
//             />
//             {imageUrl && <img src={imageUrl} alt="Profile Image" className="mt-2 w-32 h-32 object-cover" />}
//           </div>



//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={profile.email || ""}
//               disabled
//               className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md px-4 py-2"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Skills</label>
//             <input
//               type="text"
//               name="skills"
//               value={formData.skills || ""}
//               onChange={handleChange}
//               disabled={!editable}
//               className={`mt-1 block w-full px-4 py-2 border ${
//                 editable ? "border-blue-500" : "border-gray-300"
//               } rounded-md`}
//             />
//           </div>

//           <div className="flex justify-between mt-4">
//             {editable ? (
//               <>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                   disabled={!isFormDirty} // Disable Save if form is not dirty
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => setEditable(true)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
















"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner"; // Import toast from sonner

export default function FreelancerProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [image, setImage] = useState(null); // State for image
  const [imageUrl, setImageUrl] = useState(""); // Store image URL

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`/api/profile?userId=${userId}`);
        setProfile(response.data);
        setFormData(response.data.freelancerInfo || {});
        setImageUrl(response.data.profileImage || ""); // Set image URL

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    // Track if form data is changed
    setIsFormDirty(
      JSON.stringify(formData) !== JSON.stringify(profile.freelancerInfo)
    );
  }, [formData, profile.freelancerInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Set the image file
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
        freelancerInfo: formData,
        profileImage: uploadedImageUrl, // Use the uploaded image URL or the existing one
      });
  
      setProfile((prev) => ({
        ...prev,
        freelancerInfo: formData,
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
  

  const handleCancel = () => {
    setEditable(false);
    setFormData(profile.freelancerInfo || {});
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Freelancer Profile</h2>
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
            <label className="block text-gray-700">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills || ""}
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