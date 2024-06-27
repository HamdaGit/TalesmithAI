import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainComponent.css';
import logo from './assest/Tales-logo1.png';

const MainComponent = () => {
  const [welcomeText, setWelcomeText] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const text = "Welcome to TalesMithAI";

    const animateText = (text, setText) => {
      let i = 0;
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          setText(text.substring(0, i + 1));
          i++;
          if (i === text.length) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    };

    animateText(text, setWelcomeText).then(() => {
      setAnimationComplete(true);
      setButtonsVisible(true);
    });
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="container-fluid bg-white">
      <div className="row vh-100">
        <div id="blue" className="text-white col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="content align-items-center">
            <div className="logo-container align-items-center">
              <img
                id="logo"
                className="w-25 h-25 mb-3"
                style={{ margin: "auto", display: "block" }}
                src={logo}
                alt="talesmithai-logo"
              />
            </div>
            <div className="text-container">
              {animationComplete && (
                <h1 style={{ marginBottom: "20px" }}>{welcomeText}</h1>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h2 className="description">Get Started</h2>
          <div style={{ visibility: buttonsVisible ? 'visible' : 'hidden' }}>
            <button id="login-button" className="btn btn-secondary rounded-0 mx-1" onClick={handleLoginClick}>
              Login
            </button>
            <button id="signup-button" className="btn btn-secondary rounded-0 mx-1" onClick={handleSignupClick}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;