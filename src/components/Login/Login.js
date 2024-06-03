import React, { useState } from "react";

// Login component handles user authentication and registration
const Login = ({ onLogin }) => {
  // State to manage email, password, and registration mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Handle user login
  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password");
      return;
    }

    // Retrieve all users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Find the user with matching email and password
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      // Call onLogin with user details if found
      onLogin(user);
    } else {
      alert("Invalid credentials");
    }
  };

  // Handle user registration
  const handleRegister = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password");
      return;
    }

    // Retrieve all users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Check if user with the same email already exists
    if (users.find((user) => user.email === email)) {
      alert("User already exists");
    } else {
      // Create new user object
      const newUser = { email, password, books: [], reviews: {} };
      // Add new user to the users array
      users.push(newUser);
      // Store the updated users array in local storage
      localStorage.setItem("users", JSON.stringify(users));
      // Store individual user data separately for easy access
      localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
      // Call onLogin with new user details
      onLogin(newUser);
    }
  };

  return (
    <div className="container">
      <div className="title">
        BOOK<span>e</span>PEDIA
      </div>

      <div className="login">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your name..."
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password..."
        />
        <div className="login-buttons">
          <button onClick={isRegistering ? handleRegister : handleLogin}>
            {isRegistering ? "Register" : "Login"}
          </button>
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Go to Login" : "Go to Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
