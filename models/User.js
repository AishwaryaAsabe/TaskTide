// // models/User.js
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   userType: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;

// nextapp/models/User.js

import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['client', 'freelancer'], required: true },
  clientInfo: {
    address: String,
    phone: String,
    company: String,
    companylink: {
      type: String, // Field to store the portfolio link
      validate: {
        validator: function(v) {
          // Simple URL validation
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    // Add other fields as needed
  },
  freelancerInfo: {
    skills: [String],
    hourlyRate: Number,
    portfolio: {
      type: String, // Field to store the portfolio link
      validate: {
        validator: function(v) {
          // Simple URL validation
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
  
    // Add other fields as needed
  },
  profileImage: String, // Optional: for storing profile image URL
  bio: { type: String, required: true },


}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);

