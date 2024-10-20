const express = require("express");
const helmet = require('helmet')
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Import routes
const ticketRoutes = require('./routes/tickets.js');
const eventRoutes = require('./routes/event.js');

// Routes
app.use('/api/ticket', ticketRoutes);
app.use('/api/event', eventRoutes);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
        authSource: "admin",
        keepAlive: true,
        socketTimeoutMS: 30000,
    })
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log(err));

const port = 5000;
app.listen(port, () => {
    console.log("server started");
});
