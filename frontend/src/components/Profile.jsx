import React from "react";
import BottomNav from "./BottomNav";
import ProfileNavbar from "./ProfileNavbar";
import AddUserIcon from "./AddUserIcon";
import ProfileTabs from "./ProfileTabs";
import ProfileFeed from "./ProfileFeed";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Profile = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [bio, setbio] = useState("");
  const [dp, setdp] = useState("");
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
        setName(userdata.name);
        setbio(userdata.bio);
        setdp(userdata.dp);
      })
      .catch((err) => {
        console.error("Authentication Failed ❌", err);
      });
  }, []);
  return (
    <div className="bg-black border-2 border-black">
      <ProfileNavbar />
      <div className=" flex">
        <div className="pt-10 px-5 w-30 items-center">
          <div className="relative w-24 ">
            <img
              src={`http://localhost:3000/uploads/${dp}`} // ✅ full image path
              alt="Profile DP"
              className="w-18 h-18 rounded-full border border-gray-600 object-cover"
            />
            <div className="absolute bottom-0 right-6 w-5 h-5 bg-white rounded-full flex items-center justify-center border-black border-2 shadow-md cursor-pointer">
              <Plus color="black" size={15} strokeWidth={3} />
            </div>
          </div>
          <p className="text-white text-sm w-20 font-semibold truncate whitespace-nowrap overflow-hidden mx-1 mt-3.5">
            {bio}
          </p>
        </div>

        <div className="pt-10 ">
          <p className="text-white text-sm font-semibold ">{name}</p>
          <div className="flex gap-10">
            <div>
              <p className="text-xl text-white font-semibold">0</p>
              <p className="text-white text-sm font-semibold ">posts</p>
            </div>
            <div>
              <p className="text-xl text-white font-semibold">0</p>
              <p className="text-white text-sm font-semibold ">followers</p>
            </div>
            <div>
              <p className="text-xl text-white font-semibold">0</p>
              <p className="text-white text-sm font-semibold ">following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-3 mx-5 gap-3">
        <div
          className="w-35 h-8 rounded-md "
          id="btncolor"
          onClick={() => nav("/editprofile")}
        >
          <p className="text-sm text-white font-semibold text-center mt-1.5 ">
            Edit profile
          </p>
        </div>
        <div className="w-35 h-8 rounded-md" id="btncolor">
          <p className="text-sm text-white font-semibold text-center mt-1.5 ">
            Share profile
          </p>
        </div>
        <div className="w-10 h-8 rounded-md" id="btncolor">
          <p className="text-sm text-white font-semibold text-center mt-2 flex justify-center mx-3  ">
            <AddUserIcon />
          </p>
        </div>
      </div>
      <div>
        <div className="w-18 h-18  rounded-full border-white border-2 bg-transparent text-4xl  text-white text-center mt-5 mx-3 ">
          <p className="p-2.5">+</p>
        </div>
        <p className="text-white font-semibold text-[10px] mx-9 mt-0.5">New</p>
      </div>
      <div className="mt-7 ">
        <ProfileTabs />
      </div>
      <ProfileFeed />
      <BottomNav />
    </div>
  );
};

export default Profile;
