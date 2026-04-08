import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase/firebaseConfig";
import { ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(database, "users/" + user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      // ingen alert längre → snyggare UX
      navigate("/login");

    } catch (err) {
      setError("Could not create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="app-title">Create Account</h1>
        <p className="login-subtitle">Start managing your tasks today</p>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-blue login-btn"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>

        <p className="register-text">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;