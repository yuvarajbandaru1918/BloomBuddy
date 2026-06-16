import { useState, useEffect } from "react";
import "./UserProfile.css";

function UserProfile({ currentUser, onLogout }) {
  const [loginHistory, setLoginHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("loginHistory") || "[]");
    setLoginHistory(history);
  }, []);

  const lastLoginTime = localStorage.getItem("lastLoginTime");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    onLogout();
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="user-info">
          <span className="user-avatar">👤</span>
          <div className="user-details">
            <p className="username">{currentUser}</p>
            <p className="last-login">Last login: {lastLoginTime}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button 
            className="history-btn"
            onClick={() => setShowHistory(!showHistory)}
          >
            📊 Login History
          </button>
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="history-modal">
          <div className="history-content">
            <h3>🔐 Login History</h3>
            <div className="history-list">
              {loginHistory.length > 0 ? (
                loginHistory.map((login, index) => (
                  <div key={index} className="history-item">
                    <span className="history-number">{loginHistory.length - index}</span>
                    <div className="history-details">
                      <p className="history-user">👤 {login.username}</p>
                      <p className="history-time">⏰ {login.loginTimeFormatted}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-history">No login history</p>
              )}
            </div>
            <button 
              className="close-history-btn"
              onClick={() => setShowHistory(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
