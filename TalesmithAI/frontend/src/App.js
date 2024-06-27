import React from 'react';
import './App.css';
import MainComponent from './MainComponent';
import Signup from './Signup';
import Login from './Login';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Chat from './Chat';
import Feedback from './Feedback';
import Payment from './Payment';
import PaymentForm from './PaymentForm';
import Dashboard from './Dashboard';
import Dashboardlogin from './Dashboardlogin';


// No need to import Header here

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Keep the Header inside a Route to ensure it's only displayed on /mainapp */}
        <Route path="/mainapp" element={<Header />} />
        <Route path="/chat" element={<Chat />} /> 
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentform" element={<PaymentForm />} />
        <Route path="/report" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboardlogin/>} />
    
      </Routes>
   </div>
  );
};

export default App;