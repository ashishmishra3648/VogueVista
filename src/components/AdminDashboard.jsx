import React, { useEffect, useState } from 'react';
import { Users, Mail, Calendar, Shield } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from local storage
        const storedUsers = JSON.parse(localStorage.getItem('voguevista_users') || '[]');
        setUsers(storedUsers);
    }, []);

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">User Management</h1>
                    <p className="admin-subtitle">Manage and view registered users</p>
                </div>
                <div className="admin-stats">
                    <span style={{ color: 'var(--color-gold)', border: '1px solid var(--color-gold)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                        Total Users: {users.length}
                    </span>
                </div>
            </div>

            <div className="users-table-container">
                {users.length > 0 ? (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div className="user-avatar">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        {user.name}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Mail size={14} color="var(--color-text-muted)" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {user.email === 'admin@gmail.com' ? <Shield size={14} color="var(--color-gold)" /> : <Users size={14} color="var(--color-text-muted)" />}
                                            {user.email === 'admin@gmail.com' ? 'Admin' : 'Customer'}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="status-badge status-active">Active</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <Users size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3>No users registered yet</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
