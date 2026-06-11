import { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");

  return (
    <div className="login-page">

      <div className="butterfly">🦋</div>
      <div className="butterfly butterfly-2">🦋</div>

      <div className="bee">🐝</div>

      <div className="login-card">
        <h1>🌸 BloomBuddy</h1>

        <p>
          Grow your habits,
          grow your garden.
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <button onClick={onLogin}>
          Enter My Garden 🌿
        </button>
      </div>

    </div>
  );
}

export default Login;