import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const url = "http://localhost:9000/api/user/user-singin";

const SingIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onsubmitSigninForm = async (e) => {
    e.preventDefault();
    try {
      const userDetails = { email, password };
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const respose = await fetch(url, options);
      if (respose.ok) {
        const data = await respose.json();
        // navigate("/");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="main-singup-container">
      <div className="singup-container">
        <div className="singup-left">
          <h1>Welocome!</h1>
          <p>Create your account. For Free!</p>
          <Link to="/register">
            <button type="button">Sign Up</button>
          </Link>
        </div>
        <div className="singup-right">
          <h1>Login</h1>
          <form action="" className="singup-form" onSubmit={onsubmitSigninForm}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="eamil"
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
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
