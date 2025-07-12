import React from "react";
import Navbar from "../components/Navbar";
import Status from "../components/Status";
import BottomNav from "../components/BottomNav";
import RecipeReviewCard from "../components/RecipeReviewCard";
import SocialIcons from "../components/SocialIcons";
import { Plus } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [name, setname] = useState("");
  const [dp, setdp] = useState("");
  const [feed, setfeed] = useState([]);
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
        setname(userdata.name);
        setdp(userdata.dp);
      })
      .catch((err) => {
        console.error("Authentication Failed ❌", err);
      });
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;

    axios
      .get("http://localhost:3000/api/feed/posts", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        const data = res.data.data.reverse();
        setfeed(data);

        console.log(res.data);
      })
      .catch((err) => {
        console.error(" Failed ❌", err);
      });
  }, []);

  return (
    <div className="bg-black">
      <div>
        <Navbar />
      </div>

      <div className="flex gap-5 mx-3 w-94  overflow-scroll " id="scroll">
        {/* <div className="w-15 h-15  rounded-full bg-white">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-10 mx-10 border-black border-2 shadow-md">
            <Plus color="black" size={15} strokeWidth={3} />
          </div>
        </div> */}
        <div className="mt-1">
          <div className=" w-15 items-center">
            <div className="relative w-15 ">
              <img
                src={`http://localhost:3000/uploads/${dp}`} // ✅ full image path
                alt="Profile DP"
                className="w-15 h-15 rounded-full border border-gray-600 object-cover"
              />
              <div className="absolute bottom-0 right-0.5 w-5 h-5 bg-white rounded-full flex items-center justify-center border-black border-2 shadow-md cursor-pointer">
                <Plus color="black" size={15} strokeWidth={3} />
              </div>
            </div>
            {/*  */}
          </div>
          <p className="text-white text-[13px] text-center mt-1">{name}</p>
        </div>
        {/* <div className="  ">
          <img
            src={`http://localhost:3000/uploads/${dp}`}
            alt="Profile DP"
            className="w-16 h-16   rounded-full   mx-2 border-black border-2   "
          />
          <div
            className=" w-5 h-5 mt-[-7px]  rounded-full flex items-center justify-center   mx-10 border-black border-2 shadow-md"
            id="white"
          >
            <Plus color="black" size={15} strokeWidth={3} />
          </div>
        </div> */}

        {/* <p className="text-white text-[13px] text-center">{name}</p> */}
        <Status />
      </div>

      <div
        className="h-[74vh] w-full border-1  mt-5 overflow-scroll"
        id="scroll"
      >
        {/* cards */}
        {feed.map((item, index) => {
          return (
            <div className="w-auto h-130  ">
              <div className="flex gap-50">
                <div className="p-2 flex">
                  <div
                    className="w-8 h-8 border-1 rounded-full  bg-cover bg-center"
                    style={{
                      backgroundImage: `url(http://localhost:3000/uploads/${item.dp})`,
                    }}
                  ></div>
                  {/* <img
                    src={`http://localhost:3000/uploads/${item.dp}`}
                    className="w-8 h-8 border-1 rounded-full   border-gray-600 "
                  /> */}
                  <div className="mx-3  ">
                    <p className="text-[13px] font-bold text-white" key={index}>
                      {item.username}
                    </p>
                    <p className="text-[10px] text-gray-400">Surathkal beach</p>
                  </div>
                </div>
                <p className=" text-2xl text-white">...</p>
              </div>
              {/* image setup */}
              <div
                key={index}
                className="w-auto h-[40vh] m-1 border  bg-cover bg-center"
                style={{
                  backgroundImage: `url(http://localhost:3000/uploads/${item.posts})`,
                }}
              ></div>

              <div>
                <div className="px-3 pt-2">
                  <SocialIcons />
                </div>

                <div>
                  <div className="flex gap-0 p-3">
                    <div className="w-4 h-4 border-1 mt-0.5 rounded-full   border-gray-600 bg-white"></div>
                    <div className="w-4 h-4 border-1 mt-0.5 rounded-full   border-gray-600 bg-white"></div>
                    <div className="w-4 h-4 border-1 mt-0.5 rounded-full   border-gray-600 bg-white"></div>
                    <p className="text-sm font-bold mx-1 text-white">
                      10,000 likes
                    </p>
                  </div>

                  <p className="text-xs text-white px-3">
                    <b>Unknown</b> Born to scroll, forced to work.
                  </p>
                  <p className="text-xs text-gray-400 px-3">
                    View all 5000 comments
                  </p>
                  <p className="text-[10px] text-gray-400 px-3">1 day ago</p>
                  <p></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pb-3">
        <BottomNav />
      </div>
    </div>
  );
};

export default Home;
