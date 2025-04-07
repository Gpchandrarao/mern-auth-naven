import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/singup.css";
import { toast } from "react-toastify";

const url = "http://localhost:9000/api/user/user-singup";

const Signup = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onsubmitSigninForm = async (e) => {
    e.preventDefault();
    try {
      const userDetails = { username: userName, email, password };

      const respose = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await respose.json();

      if (respose.ok) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="main-singup-container">
      <div className="singup-container">
        <div className="singup-left">
          <h1>Welcome!</h1>
          <p>Sign In to your account!</p>
          <Link to="/login">
            <button type="button">Sign In</button>
          </Link>
        </div>
        <div className="singup-right">
          <h1>Register</h1>
          <form className="singup-form" onSubmit={onsubmitSigninForm}>
            <div>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="username"
                id="userName"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
