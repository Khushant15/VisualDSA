import React, { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import '../styles/faq.css';

const FAQ = () => {
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (index) => {
    setOpenAccordions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is VisualDSA?",
          answer: "VisualDSA is an interactive platform designed to help you visualize and understand algorithms and data structures in real-time. We provide step-by-step visual representations that make complex concepts intuitive."
        },
        {
          question: "Is it free to use?",
          answer: "Yes, VisualDSA is completely free for everyone. Our mission is to make computer science education accessible to all."
        }
      ]
    },
    {
      category: "Features",
      questions: [
        {
          question: "Can I control the visualization speed?",
          answer: "Yes! Every visualizer comes with a speed slider, allowing you to slow down the animation for detailed study or speed it up for a quick overview."
        },
        {
          question: "Are there practice problems?",
          answer: "We offer quizzes and a playground where you can test your knowledge and practice your coding skills directly in the browser."
        }
      ]
    }
  ];

  return (
    <div className="faq-page">
      <header className="faq-header">
        <HelpCircle size={48} className="header-icon" />
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about VisualDSA.</p>
      </header>

      <div className="faq-content">
        {faqData.map((category, catIdx) => (
          <div key={catIdx} className="faq-section">
            <h2 className="category-title">{category.category}</h2>
            <div className="questions-list">
              {category.questions.map((faq, qIdx) => {
                const key = `${catIdx}-${qIdx}`;
                const isOpen = openAccordions[key];
                return (
                  <div key={qIdx} className="faq-item">
                    <button 
                      className={`question-btn ${isOpen ? 'active' : ''}`}
                      onClick={() => toggleAccordion(key)}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    <div className={`answer-panel ${isOpen ? 'open' : ''}`}>
                      <div className="answer-content">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <footer className="faq-footer">
        <h3>Still have questions?</h3>
        <p>Can't find what you're looking for? Ask our AI Tutor or contact our support team.</p>
        <div className="footer-links">
          <a href="/documentation" className="btn-secondary">Documentation</a>
          <a href="/contact" className="btn-primary">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
