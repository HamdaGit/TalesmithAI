// Update Login component

import React, { useState } from 'react';
import axiosInstance from './axiosSetup';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/api/login/', { email, password });
            console.log('response' , response);
            navigate('/mainapp');
        } catch (error) {
            if (error.response && error.response.status === 402) {
                navigate('/payment');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        }
    };

    return (<>
<div className=' login-container-fluid'>

<div className=" login-container">
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
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
</div>
</div>
</>
);
};

export default Login;
