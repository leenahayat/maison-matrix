const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    typology: { type: String, required: true },
    brief: { type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Completed'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', InquirySchema);