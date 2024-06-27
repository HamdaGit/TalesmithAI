import React, { useState } from 'react';
import axiosInstance from './axiosSetup';
import './style.css';
import {useNavigate} from 'react-router-dom'
import {Link} from "react-router-dom"



const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()


    const handleSignup = async () => {
        try {
            const response = await axiosInstance.post( '/api/signup/', { username, email, password });
            console.log(response);
console.log('signup clicked')
            navigate('/login')
            
        } catch (error) {
            console.error(error);
            setError('An error occurred during signup. Please try again.');
        }
    };

    return (
<>
        <div className='  signup-container-fluid'>

        
        <div className=" signup-container">
            <div>
                <h2>Signup</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
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
                <button onClick={handleSignup}>Signup</button>
                {error && <p className="error">{error}</p>}
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
        </div>
        </>
    );
};

export default Signup;