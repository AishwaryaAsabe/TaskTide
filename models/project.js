// // models/project.js
// import mongoose from 'mongoose';

// const projectSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     clientId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     budget: {
//         type: Number,
//         required: true,
//     },
//     bids: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Bid',
//     }],
//     acceptedBid: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Bid',
//         default: null,
//     },
//     status: {
//         type: String,
//         enum: ['Open', 'In Progress', 'Completed', 'Closed'],
//         default: 'Open',
//     },
//     biddingDeadline: { type: Date }

// }, { timestamps: true });

// export default mongoose.models.Project || mongoose.model('Project', projectSchema);

import mongoose from 'mongoose';

// const projectSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     budget: { type: Number, required: true },
//     bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
//     acceptedBid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid', default: null },
//     status: { type: String, enum: ['Open', 'In Progress', 'Completed', 'Closed'], default: 'Open' },
//     biddingDeadline: { type: Date } // Ensure this is a date
// }, { timestamps: true });

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientName: { type: String, required: true }, // Ensure this is included if required
    budget: { type: Number, required: true },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
    acceptedBid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid', default: null },
    status: { type: String, enum: ['Open', 'In Progress', 'Completed', 'Closed'], default: 'Open' },
    biddingDeadline: { type: Date } // Ensure this is a date
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
