import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiClock, FiTruck, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = 'http://localhost:5000/api';

export default function Tracking() {
  const [ref, setRef] = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackingStages = [
    { label: 'Booking Confirmed', desc: 'Your ticket has been booked', done: true },
    { label: 'Payment Verified', desc: 'Payment has been confirmed', done: true },
    { label: 'Bus Assigned', desc: 'A bus has been assigned to your route', done: true },
    { label: 'En Route', desc: 'Your bus is currently on the way', done: false },
    { label: 'Arrived', desc: 'Bus has arrived at destination', done: false },
  ];

  const handleTrack = async () => {
    if (!ref) { toast.error('Please enter a booking reference'); return; }
    setLoading(true);
    try {
      const res = await axios.get(`${API}/bookings/${ref.toUpperCase()}`);
      if (res.data) {
        setTicket(res.data);
      } else {
        toast.error('Booking not found. Check your reference number.');
        setTicket(null);
      }
    } catch {
      toast.error('Could not find booking');
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Track Your Bus</h2>
      <p style={{ color: '#7b8db0', marginBottom: '2rem' }}>Enter your booking reference to track your journey</p>

      <div style={{ maxWidth: '500px', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }} className="form-group">
            <input
              placeholder="Enter booking reference e.g. MTL123ABC"
              value={ref}
              onChange={e => setRef(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
              style={{ textTransform: 'uppercase' }}
            />
          </div>
          <button className="btn-primary" onClick={handleTrack} disabled={loading}
            style={{ width: 'auto', padding: '0 1.5rem', marginTop: '0' }}>
            {loading ? '...' : <FiSearch size={18} />}
          </button>
        </div>
      </div>

      {ticket && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiTruck color="#00c853" /> Live Journey Tracker
            </h3>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {trackingStages.map((stage, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: i < trackingStages.length - 1 ? '0' : '0', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: stage.done ? '#00c853' : '#1e2d45',
                      display: 'grid', placeItems: 'center', zIndex: 1,
                    }}>
                      {stage.done && <FiCheckCircle size={14} color="#fff" />}
                    </div>
                    {i < trackingStages.length - 1 && (
                      <div style={{ width: '2px', height: '50px', background: stage.done ? '#00c853' : '#1e2d45' }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: '2rem' }}>
                    <div style={{ fontWeight: 600, color: stage.done ? '#f0f4ff' : '#7b8db0' }}>{stage.label}</div>
                    <div style={{ fontSize: '0.82rem', color: '#7b8db0', marginTop: '0.2rem' }}>{stage.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,200,83,0.08)', borderRadius: '12px', border: '1px solid rgba(0,200,83,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00c853', fontWeight: 600, marginBottom: '0.3rem' }}>
                <FiMapPin size={14} /> Current Status
              </div>
              <p style={{ color: '#7b8db0', fontSize: '0.85rem' }}>
                Your bus has been assigned and is preparing for departure. Expected departure at {ticket.departure || '7:00 AM'}.
              </p>
            </div>
          </div>

          <div className="card" style={{ height: 'fit-content' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Booking Details</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1e2d45' }}>
              <span style={{ color: '#7b8db0' }}>Reference</span>
              <span style={{ color: '#00c853', fontWeight: 800 }}>{ticket.bookingRef}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ color: '#7b8db0' }}>Passenger</span>
              <span style={{ fontWeight: 600 }}>{ticket.passengerName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ color: '#7b8db0' }}>Route</span>
              <span>{ticket.from} → {ticket.to}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ color: '#7b8db0' }}>Date</span>
              <span>{ticket.date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ color: '#7b8db0' }}>Seats</span>
              <span>{ticket.seats}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #1e2d45' }}>
              <span style={{ fontWeight: 700 }}>Amount</span>
              <span style={{ color: '#00c853', fontWeight: 800 }}>₦{ticket.amount?.toLocaleString()}</span>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge-green">{ticket.status}</span>
            </div>
          </div>
        </div>
      )}

      {!ticket && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#7b8db0' }}>
          <FiTruck size={60} color="#1e2d45" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ marginBottom: '0.5rem', color: '#f0f4ff' }}>Track Your Journey</h3>
          <p style={{ fontSize: '0.9rem' }}>Enter your booking reference above to see your bus status in real time</p>
        </div>
      )}
    </div>
  );
}