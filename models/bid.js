// models/bid.js
import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    freelancerName: { type: String, required: true },  // Freelancer's name

    clientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    clientName: { 
        type: String, 
        required: true 
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    bidSubmitted: { type: Boolean, default: false }, // Track bid submission
    bidAccepted: { type: Boolean, default: false }   // Track bid acceptance
}, { timestamps: true });

export default mongoose.models.Bid || mongoose.model('Bid', bidSchema);
