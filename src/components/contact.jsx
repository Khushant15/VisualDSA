import React, { useState, useEffect } from "react";
import "../styles/contact.css";
import { 
    FaGithub, 
    FaLinkedin, 
    FaTwitter, 
    FaEnvelope, 
    FaPaperPlane,
    FaCheckCircle 
} from 'react-icons/fa';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState({ submitted: false, error: false, loading: false });

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out'
        });
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus({ submitted: false, error: true, loading: false });
            return;
        }

        setFormStatus({ submitted: false, error: false, loading: true });

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `Contact from ${formData.name}`,
                    from_name: "VisualDSA Contact Form",
                }),
            });

            const result = await response.json();

            if (result.success) {
                setFormStatus({ submitted: true, error: false, loading: false });
                setFormData({ name: '', email: '', message: '' });
                
                setTimeout(() => {
                    setFormStatus({ submitted: false, error: false, loading: false });
                }, 5000);
            } else {
                setFormStatus({ submitted: false, error: true, loading: false });
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setFormStatus({ submitted: false, error: true, loading: false });
        }
    };

    return (
        <div className="contact">
            {/* Contact Form Section */}
            <section className="form-section" data-aos="fade-up">
                <div className="form-container">
                    <div className="form-header">
                        <h1>Let's Start a Conversation</h1>
                        <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>
                    </div>
                    
                    <form className="contact-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-grid">
                            <div className="input-group">
                                <label htmlFor="name">
                                    Name <span className="required">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            
                            <div className="input-group">
                                <label htmlFor="email">
                                    Email <span className="required">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="input-group full-width">
                            <label htmlFor="message">
                                Message <span className="required">*</span>
                            </label>
                            <textarea 
                                id="message"
                                name="message"
                                placeholder="Tell us about your project, questions, or how we can help..."
                                rows="6"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        
                        <div className="submit-container">
                            <button 
                                type="submit" 
                                className={`submit-btn ${formStatus.submitted ? 'success' : ''} ${formStatus.loading ? 'loading' : ''}`}
                                disabled={formStatus.submitted || formStatus.loading}
                            >
                                {formStatus.loading ? (
                                    <>
                                        <div className="btn-spinner"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : formStatus.submitted ? (
                                    <>
                                        <FaCheckCircle />
                                        <span>Message Sent!</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                            
                            {formStatus.error && (
                                <div className="form-error" role="alert">
                                    Please fill in all required fields correctly.
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </section>

            {/* Social Links Section */}
            <section className="social-section" data-aos="fade-up" data-aos-delay="100">
                <div className="social-container">
                    <h2>Connect With Us</h2>
                    <div className="social-grid">
                        <a 
                            href="https://github.com/Khushant15/VisualDSA" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-card github"
                        >
                            <div className="social-icon">
                                <FaGithub />
                            </div>
                            <div className="social-info">
                                <h3>GitHub</h3>
                                <span>View our code</span>
                            </div>
                        </a>
                        
                        <a 
                            href="https://www.linkedin.com/in/khushant-sharma-9318962b2/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-card linkedin"
                        >
                            <div className="social-icon">
                                <FaLinkedin />
                            </div>
                            <div className="social-info">
                                <h3>LinkedIn</h3>
                                <span>Professional network</span>
                            </div>
                        </a>
                        
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-card twitter"
                        >
                            <div className="social-icon">
                                <FaTwitter />
                            </div>
                            <div className="social-info">
                                <h3>Twitter</h3>
                                <span>Latest updates</span>
                            </div>
                        </a>
                        
                        <a 
                            href="mailto:khushantsharma766@gmail.com" 
                            className="social-card email"
                        >
                            <div className="social-icon">
                                <FaEnvelope />
                            </div>
                            <div className="social-info">
                                <h3>Email</h3>
                                <span>khushantsharma766@gmail.com</span>
                            </div>
                        </a>
                    </div>
                    
                    <div className="response-note">
                        <p>
                            <strong>Quick Response Promise:</strong> We typically respond within 24 hours. 
                            For urgent inquiries, feel free to reach out directly through our social channels!
                        </p>
                    </div>
                </div>
            </section>
            
        </div>
    );
}
