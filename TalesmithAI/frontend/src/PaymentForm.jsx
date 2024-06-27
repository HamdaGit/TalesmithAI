// PaymentForm.jsx
import React, { useState } from 'react';
import axiosInstance from './axiosSetup';
import './PaymentForm.css';

const PaymentForm = () => {
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/process-payment/', {
                cardNumber,
                expiryDate,
                cvv,
                amount,
            });
            console.log('Payment response:', response.data);
        } catch (error) {
            console.error('Payment error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="text" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <button className='Payment-button' type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Submit Payment'}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;