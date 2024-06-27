import React, { useState } from 'react';
import axiosInstance from './axiosSetup';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/create-checkout-session/');

            console.warn(response);
            const sessionId = response.data.id;
            const stripe = window.Stripe('pk_test_51POOuLRwnPTAWSL7K2FYCEekuODOfbTlAwX3a402BHhVvnzAaoHUYvahLa8ly0dvfYT0CjuNA2ceX56keiTwiBiR00GYhFXIus');
           const paymentResponse =  await stripe.redirectToCheckout({ sessionId });
           console.warn(paymentResponse);   
        } catch (error) {
            console.error('Error creating checkout session:', error);
            setError('Error creating checkout session.');
        } finally {
            setLoading(false);
            navigate('/paymentform');
        }
    };

    return (
        <div>
            <div className="payment-container">
                <h2>Payment Required</h2>
                <p>You have used your free trial period. Please proceed to payment to continue.</p>
                {error && <div className="error">{error}</div>}
                <button onClick={handlePayment} disabled={loading}>
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
            </div>
        </div>
    );
};

export default Payment;
