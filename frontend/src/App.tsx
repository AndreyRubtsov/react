import React, { useEffect, useState } from 'react';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

interface ApiStatus {
  status: string;
  uptime: number;
  timestamp: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchApiStatus();
    fetchUsers();
  }, []);

  const fetchApiStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const data = await response.json();
      setApiStatus(data);
    } catch (err) {
      console.error('Failed to fetch API status:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const createdUser = await response.json();
      setUsers([...users, createdUser]);
      setNewUser({ name: '', email: '', role: 'user' });
      alert('User created successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Fullstack POC</h1>
        <p>React Frontend + Node.js Backend</p>
        
        {apiStatus && (
          <div className="api-status">
            <h3>API Status: {apiStatus.status}</h3>
            <p>Uptime: {Math.floor(apiStatus.uptime)}s</p>
          </div>
        )}
      </header>

      <main className="App-main">
        <section className="users-section">
          <h2>Users Management</h2>
          
          {loading && <p>Loading users...</p>}
          {error && <p className="error">Error: {error}</p>}
          
          {!loading && !error && (
            <div className="users-list">
              <h3>Current Users ({users.length})</h3>
              {users.length === 0 ? (
                <p>No users found</p>
              ) : (
                <div className="users-grid">
                  {users.map((user) => (
                    <div key={user.id} className="user-card">
                      <h4>{user.name}</h4>
                      <p>📧 {user.email}</p>
                      <p>👤 {user.role}</p>
                      {user.createdAt && (
                        <p>📅 {new Date(user.createdAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="create-user-form">
            <h3>Add New User</h3>
            <form onSubmit={handleCreateUser}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit">Create User</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;