import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  BarChart3,
  Search,
  Database,
  GitBranch,
  Settings,
  X,
  ChevronDown,
  BookOpen,
  Cpu,
  Code,
  Menu,
  Zap,
  Hash,
  Trophy
} from "lucide-react"; 
import { useTheme } from "../ThemeContext";
import { navbarNavigationItems } from "../utils/navigation";
import ThemeToggle from "./ThemeToggle";

const ICON_COMPONENTS = {
  Home,
  BarChart3,
  Search,
  Database,
  GitBranch,
  Settings,
  BookOpen,
  Cpu,
  Code,
  Menu,
  Zap,
  Hash,
  Trophy
};

const DesktopNavItem = ({
  item,
  index,
  isOpen,
  toggleDropdown,
  isActive,
  getIcon
}) => { 
  if (item.dropdown) {
    return (
      <div 
        className="navbar-item dropdown" 
        key={index}
        onMouseEnter={() => toggleDropdown(index)}
        onMouseLeave={() => toggleDropdown(null)}
      >
        <button className={`dropdown-toggle ${isOpen === index ? "active" : ""}`}>
          {item.icon && getIcon(item.icon) &&
            React.createElement(getIcon(item.icon), {
              size: 18,
              className: "drop-icon"
            })}
          <span className="navbar-label">{item.label}</span>
          <ChevronDown size={14} className={`dropdown-arrow ${isOpen === index ? "rotated" : ""}`} />
        </button>
        {isOpen === index && (
          <div className="dropdown-menu">
            {item.dropdown.map((sub, subIndex) => (
              <Link
                key={subIndex}
                to={sub.path || "#"}
                className={`dropdown-item ${isActive(sub.path) ? "active" : ""}`}
                onClick={() => toggleDropdown(null)}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path || "#"}
      className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
      key={index}
    >
      {item.icon && getIcon(item.icon) &&
        React.createElement(getIcon(item.icon), {
          size: 18,
          className: "icon"
        })}
      <span className="navbar-label">{item.label}</span>
    </Link>
  );
};

const MobileNavItem = ({ item, index, isOpen, toggleDropdown, isActive, getIcon, closeMenu }) => {
  if (item.dropdown) {
    return (
      <div className="mobile-dropdown" key={index}>
        <button
          className={`mobile-dropdown-toggle ${isOpen === index ? "active" : ""}`}
          onClick={() => toggleDropdown(index)}
        >
          {item.icon && getIcon(item.icon) &&
            React.createElement(getIcon(item.icon), {
              size: 18,
              className: "icon"
            })}
          <span>{item.label}</span>
          <ChevronDown size={16} className={`dropdown-arrow ${isOpen === index ? "rotated" : ""}`} />
        </button>

        <div className={`mobile-dropdown-menu ${isOpen === index ? "open" : ""}`}>
          {item.dropdown.map((sub, subIndex) => (
            <Link
              key={subIndex}
              to={sub.path || "#"}
              className={`mobile-menu-link ${isActive(sub.path) ? "active" : ""}`}
              onClick={() => {
                toggleDropdown(null);
                closeMenu();
              }}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={item.path || "#"}
      className={`mobile-menu-link ${isActive(item.path) ? "active" : ""}`}
      onClick={closeMenu}
      key={index}
    >
      {item.icon && getIcon(item.icon) &&
        React.createElement(getIcon(item.icon), {
          size: 18,
          className: "icon"
        })}
      <span>{item.label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [desktopNotesOpen, setDesktopNotesOpen] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState("Notes");

  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);

  const getIcon = (name) => ICON_COMPONENTS[name] || null;
  const isActive = (path) =>
    path && (location.pathname === path || location.pathname.startsWith(path + "/"));

  const toggleDesktopDropdown = (index) =>
    setDesktopDropdownOpen(desktopDropdownOpen === index ? null : index);
  const toggleMobileDropdown = (index) =>
    setMobileDropdownOpen(mobileDropdownOpen === index ? null : index);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setDesktopDropdownOpen(null);
        setMobileDropdownOpen(null);
        setDesktopNotesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar glass-nav ${theme}`} ref={navbarRef}>
      <div className="navbar-container">
        {/* Left: Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="VisualDSA Logo" className="logo-img" />
          <span className="logo-text">
            Visual<span>DSA</span>
          </span>
        </Link>

        {/* Center: Navigation */}
        <div className="desktop-nav-menu">
          {navbarNavigationItems
            .filter((item) => item.label.toLowerCase() !== "notes" && item.label.toLowerCase() !== "analytics")
            .map((item, i) => (
              <DesktopNavItem
                key={i}
                item={item}
                index={i}
                isOpen={desktopDropdownOpen}
                toggleDropdown={toggleDesktopDropdown}
                isActive={isActive}
                getIcon={getIcon}
              />
            ))}

          {/* Notes Dropdown */}
          <div className="navbar-item dropdown"
                onMouseEnter={() => setDesktopNotesOpen(true)}
                onMouseLeave={() => setDesktopNotesOpen(false)}
           >
            <button className={`dropdown-toggle ${desktopNotesOpen ? "active" : ""}`}>
              <BookOpen size={18} className="drop-icon" />
              <span className="navbar-label">{selectedNotes}</span>
              <ChevronDown size={14} className={`${desktopNotesOpen ? "rotated" : ""}`} />
            </button>
            {desktopNotesOpen && (
              <div className="dropdown-menu">
                {["Java", "Python", "C++", "C", "JavaScript", "Rust"].map((lang) => (
                  <Link 
                    key={lang}
                    to={`/notes/${lang.toLowerCase()}`} 
                    className="dropdown-item" 
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    {lang}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="navbar-actions">
          <Link
            to="/algorithm-comparison-table"
            className={`navbar-link ${isActive("/algorithm-comparison-table") ? "active" : ""}`}
          >
            <BarChart3 size={18} className="icon" />
            <span className="navbar-label">Compare</span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">VisualDSA</span>
          <button className="mobile-menu-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="mobile-menu-content">
          {navbarNavigationItems.filter(item => item.label.toLowerCase() !== "analytics").map((item, i) => (
            <MobileNavItem
              key={i}
              item={item}
              index={i}
              isOpen={mobileDropdownOpen}
              toggleDropdown={toggleMobileDropdown}
              isActive={isActive}
              getIcon={getIcon}
              closeMenu={() => setIsMobileMenuOpen(false)}
            />
          ))}

          <Link
            to="/algorithm-comparison-table"
            className={`mobile-menu-link ${isActive("/algorithm-comparison-table") ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <BarChart3 size={18} className="icon" />
            <span>Compare Algorithms</span>
          </Link>

          <div className="mobile-footer">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
