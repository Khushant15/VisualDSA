import React, { useEffect } from "react";
import "./about.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Sparkles, Code, BrainCircuit, Rocket } from "lucide-react";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="about">
      <div
        className="about-header"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <h2 className="about-title">The Vision Behind VisualDSA</h2>
        <div className="about-divider"></div>
      </div>

      <div
        className="about-section glass-panel"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <p className="about-text">
          Created and developed by <strong>Khushant Sharma</strong>, VisualDSA is a premium, interactive platform designed to demystify complex data structures and algorithms. The core philosophy is simple: learning should be intuitive, visual, and highly engaging.
        </p>
        <p className="about-text">
          Whether you're a student preparing for technical interviews or an experienced developer refining your fundamental computer science knowledge, VisualDSA offers a unique, hands-on environment where you can watch abstract code concepts come to life in real-time.
        </p>
      </div>

      <div className="about-bento-grid">
        <div className="bento-item glass-panel" data-aos="fade-up" data-aos-delay="100">
          <div className="bento-icon-wrapper">
            <Sparkles size={28} className="bento-icon" />
          </div>
          <h3>Interactive Visualization</h3>
          <p>Go beyond static pseudocode. Watch sorting elements swap and binary trees rebalance live on your screen.</p>
        </div>

        <div className="bento-item glass-panel" data-aos="fade-up" data-aos-delay="200">
          <div className="bento-icon-wrapper">
            <BrainCircuit size={28} className="bento-icon" />
          </div>
          <h3>Comprehensive Curriculum</h3>
          <p>From fundamental Arrays to advanced Graph Pathfinding, the platform covers everything you need to master algorithms.</p>
        </div>

        <div className="bento-item glass-panel" data-aos="fade-up" data-aos-delay="300">
          <div className="bento-icon-wrapper">
            <Code size={28} className="bento-icon" />
          </div>
          <h3>Step-by-Step Execution</h3>
          <p>Control the pace. Play, pause, and step through the execution loop to understand exactly what happens under the hood.</p>
        </div>

        <div className="bento-item glass-panel" data-aos="fade-up" data-aos-delay="400">
          <div className="bento-icon-wrapper">
            <Rocket size={28} className="bento-icon" />
          </div>
          <h3>Built for Excellence</h3>
          <p>A modern, lightning-fast architecture built from the ground up to ensure a smooth, premium learning experience.</p>
        </div>
      </div>

      <div
        className="about-button-container"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <a
          href="https://khushant-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="about-button"
        >
          View Creator Portfolio
        </a>
      </div>
    </div>
  );
}
