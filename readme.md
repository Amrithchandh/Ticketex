# Event Ticketing Platform

## Overview

This platform allows users to create, buy, and resell tickets for both in-house college events and external events. The platform offers a secure, transparent, and user-friendly system for event organizers and attendees. Ticket ownership and resale transactions are tracked on the blockchain for transparency, while standard payment methods are used for ticket purchases.

## Key Features

### 1. *Event Creation and Management*
   - *Event organizers* can create events by setting details like event name, description, date, time, and ticket prices.
   - Tickets are issued and tracked via the platform’s backend, with a transparent system to manage ticket sales and availability.

### 2. *Buy and Sell Tickets*
   - Users can purchase tickets directly on the platform with standard payment methods (e.g., credit card, PayPal,crypto).
   - Each ticket sale is tracked through the platform’s blockchain backend to ensure transparency in the process.
   - Tickets are recorded as digital entries, providing a tamper-proof record of ownership.
### 3. *Ticket Resale with Profit Sharing*
   - Users can resell their tickets on the platform's marketplace if they can no longer attend the event.
   - A portion of the resale profit is automatically transferred to the event organizer.
   - The platform enforces price limits on resale to prevent scalping and overpricing.

### 4. *Dynamic QR Code Verification*
   - Each ticket generates a *dynamic QR code* that changes periodically, ensuring tickets cannot be duplicated or shared without authorization.
   - At the event, attendees present their QR code for scanning, which is verified against the platform's backend to confirm ticket authenticity.

### 5. *Wallet-Free System*
   - Users do not need to manage or use blockchain wallets to purchase tickets. The system handles blockchain-based records on the backend, allowing users to interact through a standard, easy-to-use interface.

### 6. *Transparent Ticket Tracking*
- Every ticket transaction (buying, selling, and reselling) is recorded transparently on the backend using blockchain technology. This prevents fraud, fake tickets, and ensures a clear history of ticket ownership.

### 7. *Profit Sharing for Event Organizers*
   - Event organizers automatically receive a portion of any ticket resale profits through the platform’s built-in smart contract system.
   - This creates a fair system where organizers benefit from secondary market sales.

### 8. *Fraud Prevention*
   - By leveraging blockchain technology, the platform ensures that all tickets are valid and verified at the time of event entry.
   - Dynamic QR codes prevent unauthorized sharing or duplication of tickets, reducing the risk of fraud.

---

## Technologies Used

- *Frontend*: HTML, CSS, JavaScript
- *Backend*: Node.js, Express.js
- *Blockchain*: Polygon for ticket verification and transaction tracking (handled on the backend)
- *Smart Contracts:Hardhat (for handling ticket resale and profit-sharing logic)
- *Database*: MongoDB Atlas

## How to Use the Platform

### For Event Organizers:
1. Create an event by providing details like event name, date, time, and ticket prices.
2. The platform issues tickets, which are automatically tracked via the blockchain backend.

### For Users:
1. Purchase tickets using standard payment methods (no blockchain wallets needed).
2. Resell tickets through the platform’s resale marketplace, with price limits enforced by smart contracts.
3. Present a dynamic QR code for event entry, which will be verified via the platform.




