import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setUserData(null);
      setError('User not found');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Github User Card</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
              >
                Get User
              </button>
            </div>
          </form>
          {userData && (
            <div className="card">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="card-img-top rounded-circle mx-auto mt-4"
                style={{ width: '150px' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{userData.login}</h5>
                <p className="card-text">{userData.name || 'N/A'}</p>
                <p className="card-text">No. of public repos: {userData.public_repos}</p>
                <p className="card-text">No. of public gists: {userData.public_gists}</p>
                <p className="card-text">Profile created at: {new Date(userData.created_at).toISOString().split('T')[0]}</p>
              </div>
            </div>
          )}
          {error && (
            <p className="mt-4 text-danger text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;