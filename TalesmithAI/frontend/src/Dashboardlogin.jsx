import React, { useState } from 'react';
import axiosInstance from './axiosSetup';  // Import configured axios instance
import { useNavigate } from 'react-router-dom';

import './Dashboardlogin.css';

const Dashboardlogin= () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/api/login/', { email, password });
            console.log('response', response);
            const userData = response.data;
            if (userData.is_staff) {
                console.log('login clicked');
                navigate('/report');
            } else {
                setError('You are not an admin.');
            }
        } catch (error) {
            console.error(error);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <>
       <div className='Dashboard-login-container-fluid'>

    <div className=" Dashboard-login-container">
    <div>
        <h2>Login</h2>
        <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
        
    </div>
</div>
</div>
</>
);
};

export default Dashboardlogin;
