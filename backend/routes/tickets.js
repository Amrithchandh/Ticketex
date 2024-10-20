const express = require('express');
const Ticket = require('../models/ticket');
const router = express.Router();

// Create a new ticket (Only sellers)
router.post('/create-ticket', async (req, res) => {
    const { eventName, seller, buyer, ticketURL } = req.body;

    try {
        const newTicket = new Ticket({
            eventName,
            seller,
            buyer,
            ticketURL
        });

        const savedTicket = await newTicket.save();
        res.status(201).json({
            message: "Ticket created successfully",
            ticket: savedTicket
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating ticket",
            error: error.message
        });
    }
});

router.get('/fetch-ticket', async (req, res) => {
    const { buyer } = req.query;

    try {
        const tickets = await Ticket.find({ buyer });

        if (!tickets.length) {
            return res.status(404).json({ message: "No tickets found for this buyer" });
        }

        res.status(200).json({
            message: "Tickets retrieved successfully",
            tickets
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching tickets",
            error: error.message
        });
    }
});


router.get('/tickets/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id).populate('seller').populate('buyer');
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ ticket });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching ticket",
            error: error.message
        });
    }
});

module.exports = router;