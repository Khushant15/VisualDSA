// Footer data structures extracted for better maintainability
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaGraduationCap,
  FaYoutube,
  FaDiscord,
  FaRocket,
  FaBriefcase,
} from "react-icons/fa";
import { FaPerson, FaFile } from "react-icons/fa6";

// Navigation links data
export const navigationLinks = [
  { to: "/", icon: FaRocket, label: "Home" },
  { to: "/data-structures", icon: FaCode, label: "Algorithms" },
  { to: "/learn", icon: FaGraduationCap, label: "Data Structures" },
  { to: "/about", icon: FaPerson, label: "About Us" },
  { to: "/contact", icon: FaEnvelope, label: "Contact" },
];

// Resource links data
export const resourceLinks = [
  { to: "/documentation", icon: FaFile, label: "Documentation" },
  { to: "/faq", icon: FaGraduationCap, label: "FAQ" },
  { to: "/data-structures", icon: FaGraduationCap, label: "Tutorials" },
  { to: "/blog", icon: FaGraduationCap, label: "Blog" },

];

// Social media links data
export const socialLinks = [
  {
    href: "https://github.com/Khushant15/VisualDSA",
    icon: FaGithub,
    title: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/khushant-sharma-9318962b2/",
    icon: FaLinkedin,
    title: "LinkedIn",
  },
  {
    href: "https://khushant-portfolio.vercel.app/",
    icon: FaBriefcase,
    title: "Portfolio"
  },
];

// Technology pills data
export const techPills = [
  { href: "https://react.dev/", label: "React" },
  {
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    label: "JavaScript",
  },
  { href: "https://d3js.org/", label: "D3.js" },
  { href: "https://nodejs.org/", label: "Node.js" },
];
