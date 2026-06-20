const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

AWS.config.update({
  region: process.env.AWS_REGION || 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const BOOKINGS_TABLE = 'MitchelleBookings';
const ROUTES_TABLE = 'MitchelleRoutes';

// Get all routes
app.get('/api/routes', async (req, res) => {
  const params = { TableName: ROUTES_TABLE };
  try {
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a booking
app.post('/api/bookings', async (req, res) => {
  const { passengerName, email, phone, from, to, date, seats, amount, route } = req.body;
  const booking = {
    id: uuidv4(),
    bookingRef: 'MTL' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    passengerName, email, phone, from, to, date,
    seats, amount, route,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    createdAt: new Date().toISOString(),
  };
  const params = { TableName: BOOKINGS_TABLE, Item: booking };
  try {
    await dynamoDB.put(params).promise();
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  const params = { TableName: BOOKINGS_TABLE };
  try {
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get booking by reference
app.get('/api/bookings/:ref', async (req, res) => {
  const params = {
    TableName: BOOKINGS_TABLE,
    FilterExpression: 'bookingRef = :ref',
    ExpressionAttributeValues: { ':ref': req.params.ref },
  };
  try {
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed routes
app.post('/api/seed-routes', async (req, res) => {
  const routes = [
    { id: uuidv4(), from: 'Lagos', to: 'Abuja', price: 8500, duration: '6 hrs', departure: '7:00 AM', available: 45 },
    { id: uuidv4(), from: 'Lagos', to: 'Port Harcourt', price: 7000, duration: '5 hrs', departure: '8:00 AM', available: 30 },
    { id: uuidv4(), from: 'Abuja', to: 'Kano', price: 5500, duration: '4 hrs', departure: '9:00 AM', available: 50 },
    { id: uuidv4(), from: 'Lagos', to: 'Ibadan', price: 3000, duration: '2 hrs', departure: '6:00 AM', available: 55 },
    { id: uuidv4(), from: 'Abuja', to: 'Enugu', price: 6000, duration: '5 hrs', departure: '10:00 AM', available: 40 },
    { id: uuidv4(), from: 'Port Harcourt', to: 'Calabar', price: 4500, duration: '3 hrs', departure: '11:00 AM', available: 35 },
  ];
  try {
    for (const route of routes) {
      await dynamoDB.put({ TableName: ROUTES_TABLE, Item: route }).promise();
    }
    res.json({ success: true, message: 'Routes seeded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Mitchelle Transportation server running on port ${PORT}`));