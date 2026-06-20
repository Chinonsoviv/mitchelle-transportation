import React, { useState, useEffect } from 'react';
import { FiTruck, FiUsers, FiDollarSign, FiTrendingUp, FiRefreshCw } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = 'http://localhost:5000/api';

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/bookings`);
      setBookings(res.data);
    } catch {
      toast.error('Could not load bookings');
    }
    setLoading(false);
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const totalSeats = bookings.reduce((sum, b) => sum + (b.seats || 0), 0);

  const routeData = bookings.reduce((acc, b) => {
    const key = `${b.from} → ${b.to}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(routeData).map(([name, value]) => ({ name, value }));
  const colors = ['#00c853', '#2979ff', '#ffd600', '#ff1744', '#00e676', '#7b8db0'];

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Admin Dashboard</h2>
          <p style={{ color: '#7b8db0' }}>Mitchelle Transportation LTD — Operations Overview</p>
        </div>
        <button className="btn-outline" onClick={fetchBookings} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto' }}>
          <FiRefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: <FiUsers size={24} color="#00c853" />, label: 'Total Bookings', value: bookings.length, color: '#00c853' },
          { icon: <FiDollarSign size={24} color="#ffd600" />, label: 'Total Revenue', value: `₦${totalRevenue.toLocaleString()}`, color: '#ffd600' },
          { icon: <FiTruck size={24} color="#2979ff" />, label: 'Routes Active', value: chartData.length, color: '#2979ff' },
          { icon: <FiTrendingUp size={24} color="#00e676" />, label: 'Seats Sold', value: totalSeats, color: '#00e676' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: `rgba(${stat.color === '#00c853' ? '0,200,83' : stat.color === '#ffd600' ? '255,214,0' : stat.color === '#2979ff' ? '41,121,255' : '0,230,118'},0.1)`,
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}>{stat.icon}</div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#7b8db0', marginBottom: '0.2rem' }}>{stat.label}</div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.3rem', color: stat.color }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Chart */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Bookings by Route</h3>
          {chartData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#7b8db0' }}>No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#7b8db0' }} />
                <YAxis allowDecimals={false} tick={{ fill: '#7b8db0' }} />
                <Tooltip contentStyle={{ background: '#1a2235', border: '1px solid #1e2d45', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Bookings</h3>
          {loading ? (
            <div style={{ color: '#7b8db0', textAlign: 'center', padding: '2rem' }}>Loading...</div>
          ) : bookings.length === 0 ? (
            <div style={{ color: '#7b8db0', textAlign: 'center', padding: '2rem' }}>No bookings yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '250px', overflowY: 'auto' }}>
              {bookings.slice().reverse().slice(0, 8).map(b => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem', background: '#0a0e1a', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{b.passengerName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7b8db0' }}>{b.from} → {b.to}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#00c853', fontWeight: 700, fontSize: '0.9rem' }}>₦{b.amount?.toLocaleString()}</div>
                    <span className="badge-green" style={{ fontSize: '0.7rem' }}>{b.bookingRef}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* All Bookings Table */}
      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>All Bookings</h3>
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#7b8db0' }}>
            <FiTruck size={40} color="#1e2d45" style={{ marginBottom: '1rem' }} />
            <p>No bookings yet. They will appear here once passengers book tickets.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e2d45' }}>
                  {['Ref', 'Passenger', 'Route', 'Date', 'Seats', 'Amount', 'Status'].map(h => (
                    <th key={h} style={{ padding: '0.8rem', textAlign: 'left', color: '#7b8db0', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.slice().reverse().map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #1e2d45' }}>
                    <td style={{ padding: '0.8rem', color: '#00c853', fontWeight: 700 }}>{b.bookingRef}</td>
                    <td style={{ padding: '0.8rem', fontWeight: 500 }}>{b.passengerName}</td>
                    <td style={{ padding: '0.8rem', color: '#7b8db0' }}>{b.from} → {b.to}</td>
                    <td style={{ padding: '0.8rem', color: '#7b8db0' }}>{b.date}</td>
                    <td style={{ padding: '0.8rem' }}>{b.seats}</td>
                    <td style={{ padding: '0.8rem', color: '#00c853', fontWeight: 600 }}>₦{b.amount?.toLocaleString()}</td>
                    <td style={{ padding: '0.8rem' }}><span className="badge-green">{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}