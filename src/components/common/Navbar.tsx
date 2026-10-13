import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { BookOpen, Users, Share2, Shield, LogOut, FileText } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <div className="brand-icon">
            <FileText size={18} />
          </div>
          <span>SecureNotes</span>
        </NavLink>

        {isAuthenticated && (
          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <BookOpen size={16} />
              <span>My Notes</span>
            </NavLink>

            <NavLink
              to="/interests"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Users size={16} />
              <span>Interests (Agg 1)</span>
            </NavLink>

            <NavLink
              to="/posts"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Share2 size={16} />
              <span>User Posts (Agg 2)</span>
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <Shield size={16} />
                <span>Admin Panel</span>
              </NavLink>
            )}
          </nav>
        )}

        <div className="nav-user">
          {isAuthenticated && user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user.name}</span>
                <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                title="Log out"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <NavLink to="/login" className="btn btn-secondary btn-sm">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm">
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
