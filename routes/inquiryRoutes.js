const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');


router.post('/inquiries', async (req, res) => {
    try {
        const { name, email, typology, brief } = req.body;
        const newInquiry = new Inquiry({ name, email, typology, brief });
        await newInquiry.save();
        res.status(201).json({ success: true, message: 'Inquiry successfully saved into MongoDB.' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/inquiries', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put('/inquiries/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedInquiry = await Inquiry.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true, runValidators: true }
        );
        if (!updatedInquiry) return res.status(404).json({ message: 'Inquiry record not found.' });
        res.status(200).json({ success: true, data: updatedInquiry });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/inquiries/:id', async (req, res) => {
    try {
        const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!deletedInquiry) return res.status(404).json({ message: 'Inquiry record not found.' });
        res.status(200).json({ success: true, message: 'Record permanently deleted from Database.' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;