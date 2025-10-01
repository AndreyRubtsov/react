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

  // Debug logging
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    API_BASE_URL: API_BASE_URL,
  });

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
      setError(null);
      console.log('Fetching users from:', `${API_BASE_URL}/api/users`);

      const response = await fetch(`${API_BASE_URL}/api/users`);
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);

      // The API returns users directly as an array
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to connect to server'
      );
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
      console.log('Creating user:', newUser);

      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      console.log('Create user response status:', response.status);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `Failed to create user: ${response.status} - ${errorData}`
        );
      }

      const createdUser = await response.json();
      console.log('Created user:', createdUser);

      setUsers([...users, createdUser]);
      setNewUser({ name: '', email: '', role: 'user' });
      alert('User created successfully!');
    } catch (err) {
      console.error('Create user error:', err);
      alert(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  const testConnection = async () => {
    try {
      console.log('Testing connection to:', `${API_BASE_URL}/api/health`);
      const response = await fetch(`${API_BASE_URL}/api/health`);
      console.log('Test response:', response);
      const data = await response.json();
      console.log('Test data:', data);
      alert(`Connection successful! API Status: ${data.status}`);
    } catch (err) {
      console.error('Connection test failed:', err);
      alert(
        `Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>🚀 Fullstack POC</h1>
        <p>React Frontend + Node.js Backend</p>

        <div style={{ margin: '1rem 0' }}>
          <button
            onClick={testConnection}
            style={{
              padding: '0.5rem 1rem',
              background: '#4ade80',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Test API Connection
          </button>
        </div>

        {apiStatus && (
          <div className='api-status'>
            <h3>API Status: {apiStatus.status}</h3>
            <p>Uptime: {Math.floor(apiStatus.uptime)}s</p>
          </div>
        )}
      </header>

      <main className='App-main'>
        <section className='users-section'>
          <h2>Users Management</h2>

          {loading && <p>Loading users...</p>}
          {error && (
            <div className='error'>
              <h4>Connection Error</h4>
              <p>Error: {error}</p>
              <p>API URL: {API_BASE_URL}/api/users</p>
              <p>Make sure the backend server is running on port 3001</p>
            </div>
          )}

          {!loading && !error && (
            <div className='users-list'>
              <h3>Current Users ({users.length})</h3>
              {users.length === 0 ? (
                <p>No users found</p>
              ) : (
                <div className='users-grid'>
                  {users.map(user => (
                    <div key={user.id} className='user-card'>
                      <h4>{user.name}</h4>
                      <p>📧 {user.email}</p>
                      <p>👤 {user.role}</p>
                      {user.createdAt && (
                        <p>
                          📅 {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className='create-user-form'>
            <h3>Add New User</h3>
            <form onSubmit={handleCreateUser}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name'
                  value={newUser.name}
                  onChange={e =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Email'
                  value={newUser.email}
                  onChange={e =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className='form-group'>
                <select
                  value={newUser.role}
                  onChange={e =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value='user'>User</option>
                  <option value='admin'>Admin</option>
                </select>
              </div>
              <button type='submit'>Create User</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
