import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import './footer.css';
import Logo from '../../assets/LOGO.png';
import { FaExternalLinkAlt, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const values = {
        email: email,
        message: message
    }

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        emailjs
            .send('service_psbc98i', 'template_rfb9wlb', values, 'TwR4uGBoc8VfmyewI')
            .then((res) => {
                alert("Feedback Sent Successfully.");
                setEmail('');
                setMessage('');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <footer className="footer">
            <div className="feedback-form">
                <form onSubmit={handleFeedbackSubmit}>
                    <input type="email" name="name" placeholder="Your Email" required onChange={(e) => setEmail(e.target.value)} />
                    <textarea name="message" placeholder="Your Feedback" required onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button type="submit" className='send_feedback'><span>Send Feedback</span> <FiChevronRight className='send_icon' /> </button>
                </form>
            </div>
            <div className="footer-content">
                <div className="footer-left">
                    <img src={Logo} alt="Logo" className="logo" />
                </div>
                <div className="footer-center">
                    <p className="footer-text">© 2023 MakeTastyy. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <a href="https://roshan-rajurkar.github.io/R_R_/" target="_blank" className="social-icon"><FaExternalLinkAlt /></a>
                    <a href="https://www.instagram.com/roshan_rajurkar__/" target="_blank" className="social-icon"><FaInstagram /></a>
                    <a href="https://github.com/Roshan-Rajurkar" target="_blank" className="social-icon"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/roshan-rajurkar-3400a4206/" target="_blank" className="social-icon"><FaLinkedin /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
