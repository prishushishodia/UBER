import React, { use } from "react";
import { Link, useNavigate, useActionData } from "react-router-dom";
import { useState } from "react";
import {UserDataContext} from '../context/userContext'
import { useContext } from "react";
import axios from "axios";

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const {user, setUser}= useContext(UserDataContext);

const navigate= useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData={
      email: email,
      password: password,
    };

const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

 if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    };

    setemail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 scale-180 m-7"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">Enter Email</h3>
          <input
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#000] text-white font-semibold mb-7 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base">
            login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
