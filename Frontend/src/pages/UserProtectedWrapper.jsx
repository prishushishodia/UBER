import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
        }
      })
     .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-mist">
        <span className="text-3xl font-extrabold tracking-tight text-ink">Uber</span>
        <span className="spinner text-fog" />
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
