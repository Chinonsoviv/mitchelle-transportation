import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookTicket from './pages/BookTicket';
import Payment from './pages/Payment';
import MyTickets from './pages/MyTickets';
import Tracking from './pages/Tracking';
import Admin from './pages/Admin';
import './App.css';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookTicket />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/tickets" element={<MyTickets />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}