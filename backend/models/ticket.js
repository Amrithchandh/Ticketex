const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    buyer: {
        type: String,
        default: null,  // Buyer is null initially
    },
    ticketURL: {
        type: String,
        default: "",
    },
    nftData: {
        type: Object,
    }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);