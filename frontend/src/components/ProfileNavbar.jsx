import React from "react";
import { Lock, PlusSquare, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
const ProfileNavbar = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;

    axios
      .get("http://localhost:3000/user/auth", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        const userdata = res.data.data;
        setName(userdata.username);
      })
      .catch((err) => {
        console.error("Authentication Failed ❌", err);
      });
  }, []);

  return (
    <div className="flex p-4 gap-37 items-center">
      <div className=" flex items-center ">
        <Lock color="white" size={20} strokeWidth={2} className="font-bold" />
        <p className="text-white font-bold mx-1">{name}</p>
      </div>
      <div className="flex gap-5 items-center">
        <PlusSquare color="white" />
        <Menu color="white" size={24} strokeWidth={2} />
      </div>
    </div>
  );
};

export default ProfileNavbar;
