import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, LogIn, LogOut, Bookmark, ChevronRight, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../contexts/FirebaseAuthContext";
import "../styles/UserDropdown.css";

// Generate avatar initials from name or email
const getInitials = (name, email) => {
  if (name) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "U";
};

const UserDropdown = () => {
  const { theme } = useTheme();
  const { user, signOut, displayName, email, isLoggedIn } = useAuth();
  const isDark = theme === "dark";
  const themeClass = isDark ? "dark" : "light";
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const initials = getInitials(displayName, email);

  return (
    <DropdownMenu.Root>
      {/* Trigger */}
      <DropdownMenu.Trigger asChild>
        <button className={`user-dropdown-trigger ${themeClass}`} aria-label="User menu">
          {isLoggedIn ? (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
          ) : (
            <User className={`user-icon ${themeClass}`} strokeWidth={2} />
          )}
        </button>
      </DropdownMenu.Trigger>

      {/* Menu */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={10}
          className={`user-dropdown-content ${themeClass}`}
          style={{ animationDuration: "200ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Header */}
          <div className={`user-dropdown-header ${themeClass}`}>
            <div className="flex items-center gap-3">
              <div
                className="user-avatar"
                style={isLoggedIn ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", fontSize: "0.85rem", fontWeight: 700 } : {}}
              >
                {isLoggedIn ? initials : <User className="w-6 h-6 text-white" strokeWidth={2.5} />}
              </div>
              <div className="flex-1">
                {isLoggedIn ? (
                  <>
                    <p className={`user-welcome-text ${themeClass}`}>{displayName || "User"}</p>
                    <p className={`user-subtitle ${themeClass}`} style={{ fontSize: "0.7rem" }}>{email}</p>
                  </>
                ) : (
                  <>
                    <p className={`user-welcome-text ${themeClass}`}>Welcome!</p>
                    <p className={`user-subtitle ${themeClass}`}>Sign in to your account</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="user-dropdown-items">
            {!isLoggedIn ? (
              <>
                {/* Login */}
                <DropdownMenu.Item asChild>
                  <Link to="/login" className={`user-menu-item ${themeClass}`}>
                    <div className={`menu-icon-container icon-blue ${themeClass}`}>
                      <LogIn className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className="flex-1 font-semibold">Login</span>
                    <ChevronRight className={`chevron-icon ${themeClass}`} strokeWidth={2.5} />
                  </Link>
                </DropdownMenu.Item>

                {/* Sign up */}
                <DropdownMenu.Item asChild>
                  <Link to="/signup" className={`user-menu-item ${themeClass}`}>
                    <div className={`menu-icon-container icon-amber ${themeClass}`}>
                      <UserPlus className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className="flex-1 font-semibold">Sign Up</span>
                    <ChevronRight className={`chevron-icon ${themeClass}`} strokeWidth={2.5} />
                  </Link>
                </DropdownMenu.Item>
              </>
            ) : (
              <>
                {/* Saved Notes */}
                <DropdownMenu.Item asChild>
                  <Link to="/saved" className={`user-menu-item ${themeClass}`}>
                    <div className={`menu-icon-container icon-amber ${themeClass}`}>
                      <Bookmark className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className="flex-1 font-semibold">Saved Notes</span>
                    <ChevronRight className={`chevron-icon ${themeClass}`} strokeWidth={2.5} />
                  </Link>
                </DropdownMenu.Item>

                <div className={`user-dropdown-separator ${themeClass}`} />

                {/* Logout */}
                <DropdownMenu.Item
                  className={`user-menu-item ${themeClass}`}
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  <div className={`menu-icon-container icon-red ${themeClass}`}>
                    <LogOut className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span className="flex-1 font-semibold">Logout</span>
                  <ChevronRight className={`chevron-icon ${themeClass}`} strokeWidth={2.5} />
                </DropdownMenu.Item>
              </>
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
