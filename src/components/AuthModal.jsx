import React, { useState } from 'react';
import { X } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            // Login Logic
            try {
                const storedUsers = JSON.parse(localStorage.getItem('voguevista_users') || '[]');
                const user = storedUsers.find(u => u.email === email);

                if (user) {
                    if (user.password === password) {
                        onLogin(user);
                        onClose();
                        // Reset forms
                        setEmail('');
                        setPassword('');
                        setName('');
                    } else {
                        setError('Incorrect password. Please try again.');
                    }
                } else {
                    setError('User account not found. Please sign up.');
                }
            } catch (err) {
                console.error("Auth Error", err);
                setError('An error occurred. Please try again.');
            }
        } else {
            // Signup Logic
            try {
                const storedUsers = JSON.parse(localStorage.getItem('voguevista_users') || '[]');

                if (storedUsers.find(u => u.email === email)) {
                    setError('User already exists. Please log in.');
                    return;
                }

                const newUser = { name, email, password };
                localStorage.setItem('voguevista_users', JSON.stringify([...storedUsers, newUser]));

                onLogin(newUser);
                onClose();
                // Reset forms
                setEmail('');
                setPassword('');
                setName('');
            } catch (err) {
                console.error("Registration Error", err);
                setError('Unable to register. Please try again.');
            }
        }
    };

    const handleSwitchMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setPassword('');
    }

    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <button className="auth-close" onClick={onClose}><X size={24} /></button>

                <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="auth-subtitle">
                    {isLogin ? 'Enter your details to sign in' : 'Sign up to start your journey'}
                </p>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            className="auth-toggle-btn"
                            onClick={handleSwitchMode}
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
