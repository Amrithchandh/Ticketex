const mongoose = require('mongoose');

// Helper function to generate a 5-digit random number
function generateEventId() {
  return Math.floor(10000 + Math.random() * 90000); // generates a number between 10000 and 99999
}

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  ticketsAvailable: { type: Number, default: 0 },
  createdBy: { type: String, required: true },
  eventId: { type: Number, unique: true }, // new eventId field
  participants: [{ type: String }] // new participants field
}, { timestamps: true });

// Pre-save hook to generate and assign eventId if not already set
eventSchema.pre('save', function (next) {
  if (!this.eventId) {
    this.eventId = generateEventId();
  }
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;