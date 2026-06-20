import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCreditCard, FiLock, FiCheckCircle, FiSmartphone, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card', icon: '💳', desc: 'Debit or Credit Card' },
  { id: 'transfer', label: 'Bank Transfer', icon: '🏦', desc: 'Transfer from any bank' },
  { id: 'ussd', label: 'USSD', icon: '📱', desc: 'No internet needed' },
  { id: 'opay', label: 'OPay', icon: '🟢', desc: 'OPay wallet' },
  { id: 'palmpay', label: 'PalmPay', icon: '🌴', desc: 'PalmPay wallet' },
  { id: 'arrival', label: 'Pay on Arrival', icon: '💵', desc: 'Pay cash at boarding' },
];

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [method, setMethod] = useState('card');
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvv: '' });

  if (!booking) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <h2>No booking found</h2>
        <p style={{ color: '#7b8db0', marginTop: '1rem' }}>Please book a ticket first.</p>
      </div>
    );
  }

  const handlePayment = async () => {
    if (method === 'card' && (!card.name || !card.number || !card.expiry || !card.cvv)) {
      toast.error('Please fill all card details'); return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    try {
      const res = await axios.post(`${API}/bookings`, {
        passengerName: booking.passengerName,
        email: booking.email,
        phone: booking.phone,
        from: booking.from,
        to: booking.to,
        date: booking.date,
        seats: booking.seats,
        amount: booking.amount,
        route: `${booking.from} to ${booking.to}`,
        paymentMethod: method,
      });
      setBookingRef(res.data.booking.bookingRef);
      setStep(2);
      toast.success('Booking confirmed!');
    } catch {
      toast.error('Booking failed, please try again');
    }
    setLoading(false);
  };

  if (step === 2) {
    return (
      <div className="page" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', paddingTop: '3rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,200,83,0.15)', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem' }}>
          <FiCheckCircle size={40} color="#00c853" />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
        <p style={{ color: '#7b8db0', marginBottom: '2rem' }}>
          {method === 'arrival' ? 'Please pay cash when you board the bus.' : 'Your payment has been received and ticket confirmed.'}
        </p>
        <div className="card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1e2d45' }}>
            <span style={{ color: '#7b8db0' }}>Booking Reference</span>
            <span style={{ color: '#00c853', fontWeight: 800, fontSize: '1.1rem' }}>{bookingRef}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#7b8db0' }}>Passenger</span>
            <span style={{ fontWeight: 600 }}>{booking.passengerName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#7b8db0' }}>Route</span>
            <span>{booking.from} to {booking.to}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#7b8db0' }}>Date</span>
            <span>{booking.date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#7b8db0' }}>Seats</span>
            <span>{booking.seats}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#7b8db0' }}>Payment Method</span>
            <span>{PAYMENT_METHODS.find(m => m.id === method)?.label}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #1e2d45' }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <span style={{ color: '#00c853', fontWeight: 800 }}>N{booking.amount.toLocaleString()}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-outline" onClick={() => navigate('/tickets')}>View My Tickets</button>
          <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Complete Payment</h2>
      <p style={{ color: '#7b8db0', marginBottom: '2rem' }}>Choose your preferred payment method</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <FiLock size={16} color="#00c853" />
            <span style={{ fontSize: '0.85rem', color: '#00c853' }}>Secure and Encrypted Payment</span>
          </div>

          {/* Payment Method Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.7rem', marginBottom: '2rem' }}>
            {PAYMENT_METHODS.map(m => (
              <div key={m.id} onClick={() => setMethod(m.id)} style={{
                padding: '0.8rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer',
                background: method === m.id ? 'rgba(0,200,83,0.1)' : '#0a0e1a',
                border: method === m.id ? '1px solid #00c853' : '1px solid #1e2d45',
                transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{m.icon}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: method === m.id ? '#00c853' : '#f0f4ff' }}>{m.label}</div>
                <div style={{ fontSize: '0.68rem', color: '#7b8db0', marginTop: '0.2rem' }}>{m.desc}</div>
              </div>
            ))}
          </div>

          {/* Card Payment */}
          {method === 'card' && (
            <div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input placeholder="Name on card" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input placeholder="0000 0000 0000 0000" maxLength={19} value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input placeholder="MM/YY" maxLength={5} value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input placeholder="123" maxLength={3} type="password" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* Bank Transfer */}
          {method === 'transfer' && (
            <div style={{ padding: '1.5rem', background: '#0a0e1a', borderRadius: '12px', border: '1px solid #1e2d45' }}>
              <h4 style={{ marginBottom: '1rem', color: '#00c853' }}>Transfer to this account</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: '#7b8db0' }}>Bank Name</span>
                <span style={{ fontWeight: 600 }}>First Bank Nigeria</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: '#7b8db0' }}>Account Number</span>
                <span style={{ fontWeight: 700, color: '#00c853', fontSize: '1.1rem' }}>3012345678</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: '#7b8db0' }}>Account Name</span>
                <span style={{ fontWeight: 600 }}>Mitchelle Transportation LTD</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7b8db0' }}>Amount</span>
                <span style={{ fontWeight: 700, color: '#00c853' }}>N{booking.amount.toLocaleString()}</span>
              </div>
              <p style={{ color: '#7b8db0', fontSize: '0.8rem', marginTop: '1rem', lineHeight: 1.5 }}>
                Use your booking name as the transfer reference. Click confirm after transferring.
              </p>
            </div>
          )}

          {/* USSD */}
          {method === 'ussd' && (
            <div style={{ padding: '1.5rem', background: '#0a0e1a', borderRadius: '12px', border: '1px solid #1e2d45' }}>
              <h4 style={{ marginBottom: '1rem', color: '#00c853' }}>Dial any of these codes</h4>
              {[
                { bank: 'GTBank', code: `*737*${booking.amount}#` },
                { bank: 'First Bank', code: `*894*${booking.amount}#` },
                { bank: 'Access Bank', code: `*901*${booking.amount}#` },
                { bank: 'UBA', code: `*919*${booking.amount}#` },
                { bank: 'Zenith Bank', code: `*966*${booking.amount}#` },
              ].map((u, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', padding: '0.7rem', background: '#111827', borderRadius: '8px' }}>
                  <span style={{ color: '#7b8db0', fontSize: '0.85rem' }}>{u.bank}</span>
                  <span style={{ color: '#00c853', fontWeight: 700, fontFamily: 'monospace' }}>{u.code}</span>
                </div>
              ))}
              <p style={{ color: '#7b8db0', fontSize: '0.8rem', marginTop: '1rem' }}>Dial the code on your phone. No internet needed. Click confirm after payment.</p>
            </div>
          )}

          {/* OPay */}
          {method === 'opay' && (
            <div style={{ padding: '1.5rem', background: '#0a0e1a', borderRadius: '12px', border: '1px solid #1e2d45' }}>
              <h4 style={{ marginBottom: '1rem', color: '#00c853' }}>Pay with OPay</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: '#7b8db0' }}>OPay Number</span>
                <span style={{ fontWeight: 700, color: '#00c853', fontSize: '1.1rem' }}>08012345678</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: '#7b8db0' }}>Account Name</span>
                <span style={{ fontWeight: 600 }}>Mitchelle Transportation</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7b8db0' }}>Amount</span>
                <span style={{ fontWeight: 700, color: '#00c853' }}>N{booking.amount.toLocaleString()}</span>
              </div>
              <p style={{ color: '#7b8db0', fontSize: '0.8rem', marginTop: '1rem' }}>Open your OPay app, send to this number, then click confirm.</p>
            </div>
          )}

          {/* PalmPay */}
          {method === 'palmpay' && (
            <div style={{ padding: '1.5rem', background: '#0a0e1a', borderRadius: '12px', border: '1px solid #1e2d45' }}>
              <h4 style={{ marginBottom: '1rem', color: '#00c853' }}>Pay with PalmPay</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: '#7b8db0' }}>PalmPay Number</span>
                <span style={{ fontWeight: 700, color: '#00c853', fontSize: '1.1rem' }}>08087654321</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: '#7b8db0' }}>Account Name</span>
                <span style={{ fontWeight: 600 }}>Mitchelle Transportation</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7b8db0' }}>Amount</span>
                <span style={{ fontWeight: 700, color: '#00c853' }}>N{booking.amount.toLocaleString()}</span>
              </div>
              <p style={{ color: '#7b8db0', fontSize: '0.8rem', marginTop: '1rem' }}>Open your PalmPay app, send to this number, then click confirm.</p>
            </div>
          )}

          {/* Pay on Arrival */}
          {method === 'arrival' && (
            <div style={{ padding: '1.5rem', background: '#0a0e1a', borderRadius: '12px', border: '1px solid #1e2d45' }}>
              <h4 style={{ marginBottom: '1rem', color: '#00c853' }}>Pay on Arrival</h4>
              <p style={{ color: '#7b8db0', fontSize: '0.9rem', lineHeight: 1.7 }}>
                Your seat will be reserved for you. Please arrive at the bus terminal at least 30 minutes before departure and pay the fare in cash to the conductor.
              </p>
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,200,83,0.08)', borderRadius: '10px', border: '1px solid rgba(0,200,83,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#7b8db0', fontSize: '0.85rem' }}>Amount to Pay</span>
                  <span style={{ fontWeight: 700, color: '#00c853' }}>N{booking.amount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#7b8db0', fontSize: '0.85rem' }}>Seat Reserved Until</span>
                  <span style={{ fontSize: '0.85rem' }}>30 mins before departure</span>
                </div>
              </div>
            </div>
          )}

          <button className="btn-primary" onClick={handlePayment} disabled={loading} style={{ marginTop: '1.5rem' }}>
            {loading ? 'Processing...' : method === 'arrival' ? 'Reserve My Seat' : `Confirm Payment - N${booking.amount.toLocaleString()}`}
          </button>
        </div>

        <div className="card" style={{ height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1e2d45' }}>
            <span style={{ color: '#7b8db0' }}>Route</span>
            <span style={{ fontWeight: 600 }}>{booking.from} to {booking.to}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#7b8db0' }}>Passenger</span>
            <span>{booking.passengerName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#7b8db0' }}>Date</span>
            <span>{booking.date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#7b8db0' }}>Seats</span>
            <span>{booking.seats}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #1e2d45' }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <span style={{ color: '#00c853', fontWeight: 800, fontSize: '1.2rem' }}>N{booking.amount.toLocaleString()}</span>
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#0a0e1a', borderRadius: '10px', fontSize: '0.8rem', color: '#7b8db0', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <FiLock size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
            <span>This is a demo system. No real payments are processed.</span>
          </div>
        </div>
      </div>
    </div>
  );
}