const express = require("express");
const Event = require("../models/event");
const router = express.Router();
const QRCode = require('qrcode');
const cloudinary = require('cloudinary').v2;
require("dotenv").config();
const fetch = require('node-fetch');
const Ticket = require('../models/ticket');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.post("/create-event", async (req, res) => {
    const {
        eventName,
        location,
        date,
        description,
        ticketsAvailable,
        createdBy
    } = req.body;

    try {
        const newEvent = new Event({
            eventName,
            location,
            date,
            description,
            ticketsAvailable,
            createdBy
        });

        await newEvent.save();
        res
            .status(201)
            .json({ message: "Event created successfully!", event: newEvent });
    } catch (error) {
        res.status(500).json({ error: "Error creating event", details: error });
    }
});

router.get("/fetch-events", async (req, res) => {
    const { createdBy } = req.query;

    try {
        const events = await Event.find({ createdBy }).sort({ createdAt: -1 });;
        if (events.length > 0) {
            res.status(200).json({ events });
        } else {
            res.status(404).json({ message: "No events found for this user" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching events", details: error });
    }
});

router.post("/join-event", async (req, res) => {
    const { eventId, wallet } = req.body;

    try {
        // Find the event by eventId
        const event = await Event.findOne({ eventId });

        // If event is not found
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if the user has already joined the event
        if (event.participants.includes(wallet)) {
            return res.status(400).json({ message: "User has already joined the event" });
        }

        // Add the wallet to the participants array
        event.participants.push(wallet);

        // Save the updated event
        await event.save();

        // Create the object with user wallet and eventId
        const qrData = { user: wallet, eventId: eventId };

        // Convert the object to a JSON string
        const qrDataString = JSON.stringify(qrData);

        // Generate the QR code as a data URL
        const qrCodeDataUrl = await QRCode.toDataURL(qrDataString);

        // Upload the QR code image to Cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(qrCodeDataUrl, {
            upload_preset: 'ticketex', // Optional: specify an upload preset if needed
        });

        // Mint NFT by sending a POST request to the blockchain server
        const nftMintingResponse = await fetch('http://127.0.0.1:8000/mint_nft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_address: wallet, // Replace with wallet
                nft_url: uploadedResponse.secure_url // Use Cloudinary URL
            })
        });

        // Parse the JSON response from the minting server
        const nftMintingData = await nftMintingResponse.json();

        const newTicket = new Ticket({
            eventId,
            seller: event.createdBy,  // Assuming event.organizer is the seller
            buyer: wallet,  // The user who joined the event is the buyer
            ticketURL: uploadedResponse.secure_url,
            nftData: nftMintingData // Store the Cloudinary URL in the ticket
        });

        // Save the new ticket
        const savedTicket = await newTicket.save();


        // Send the Cloudinary URL and NFT minting status as a response
        res.status(200).json({
            message: "Successfully joined the event and minted NFT",
            event,
            qrCodeUrl: uploadedResponse.secure_url, // Cloudinary URL
            nftMinting: nftMintingData // Response from the minting server
        });



    } catch (error) {
        res.status(500).json({ error: "Error joining event", details: error });
        console.log(error);

    }
});


module.exports = router;
