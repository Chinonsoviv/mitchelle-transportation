import React, { useState, useEffect } from 'react';
import { FiTruck, FiCalendar, FiUser, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = 'http://localhost:5000/api';

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchTickets(); }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${API}/bookings`);
      setTickets(res.data);
    } catch {
      toast.error('Could not load tickets');
    }
    setLoading(false);
  };

  const filtered = tickets.filter(t =>
    t.passengerName?.toLowerCase().includes(search.toLowerCase()) ||
    t.bookingRef?.toLowerCase().includes(search.toLowerCase()) ||
    t.from?.toLowerCase().includes(search.toLowerCase()) ||
    t.to?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>My Tickets</h2>
      <p style={{ color: '#7b8db0', marginBottom: '2rem' }}>View and manage all your booked tickets</p>

      <div style={{ position: 'relative', marginBottom: '2rem', maxWidth: '400px' }}>
        <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#7b8db0' }} />
        <input
          placeholder="Search by name, ref, or route..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', background: '#1a2235', border: '1px solid #1e2d45',
            color: '#f0f4ff', padding: '0.75rem 1rem 0.75rem 2.8rem',
            borderRadius: '10px', fontSize: '0.9rem', outline: 'none',
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#7b8db0' }}>Loading tickets...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <FiTruck size={48} color="#1e2d45" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: '#7b8db0' }}>No tickets found</h3>
          <p style={{ color: '#7b8db0', marginTop: '0.5rem', fontSize: '0.9rem' }}>Book a ticket to see it here</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.slice().reverse().map(ticket => (
            <div key={ticket.id} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#7b8db0', marginBottom: '0.3rem' }}>ROUTE</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{ticket.from} → {ticket.to}</div>
                <div style={{ fontSize: '0.8rem', color: '#7b8db0', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FiCalendar size={11} />{ticket.date}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#7b8db0', marginBottom: '0.3rem' }}>PASSENGER</div>
                <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FiUser size={14} color="#00c853" />{ticket.passengerName}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#7b8db0', marginTop: '0.2rem' }}>{ticket.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#7b8db0', marginBottom: '0.3rem' }}>BOOKING REF</div>
                <div style={{ color: '#00c853', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Space Grotesk' }}>{ticket.bookingRef}</div>
                <div style={{ fontSize: '0.8rem', color: '#7b8db0', marginTop: '0.2rem' }}>{ticket.seats} seat{ticket.seats > 1 ? 's' : ''}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#00c853', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  ₦{ticket.amount?.toLocaleString()}
                </div>
                <span className="badge-green">{ticket.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}