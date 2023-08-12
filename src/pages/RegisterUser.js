import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      const credentials = {
        name,
        email,
        password,
      };
      return UserService.createUser(credentials)
        .then((res) => {
          if (res.data.token) {
            setEmail("");
            setName("");
            setPassword("");
            alert("user registered");
            return navigate("/login");
          } else {
            setEmail((email) => email);
            setPassword((password) => password);
            return console.log(res);
          }
        })
        .catch((err) => {
          return alert(err);
        });
    } else {
      return alert("please provide all information");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Register</button>
        <p>
          <span>Already have an account?</span>
          <a href="/login">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterUser;
