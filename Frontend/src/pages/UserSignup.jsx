import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserDataContext);

 const submitHandler = async (e) => {
  e.preventDefault();

  const newUser = {
    fullname: {
      firstname: firstName,
      lastname: lastName,
    },
    email,
    password,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 200) {
      const data = response.data;
      console.log("User created:", data);

      setUser(data.user);
      localStorage.setItem('token', data.token); // ✅ FIXED
      navigate("/home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  } catch (error) {
    console.error("Signup error:", error);
    if (error.response) {
      alert(error.response.data?.message || JSON.stringify(error.response.data));
    } else {
      alert("Something went wrong.");
    }
  }
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
          <h3 className="font-semibold text-xl mb-2">Enter Name</h3>
          <div className="flex gap-3 mb-6">
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
              type="firstname"
              placeholder="firstname"
            />
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              className="bg-[#eeeeee] w-1/2   rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
              type="lastname"
              placeholder="lastname"
            />
          </div>

          <h3 className=" font-semibold text-xl mb-2">Enter Email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="font-semibold text-xl mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#000] text-white font-semibold mb-7 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            login.
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
