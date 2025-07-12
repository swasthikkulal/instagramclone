import axios from "axios";
import React, { useEffect, useState } from "react";

const Status = () => {
  const [story, setstory] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Add this to confirm

    axios
      .get("http://localhost:3000/api/status/get", {
        headers: {
          "auth-token": token, // ✅ must match backend `req.headers["auth-token"]`
        },
      })
      .then((res) => {
        setstory(res.data.data);
      })
      .catch((err) => {
        console.log("Error:", err.response?.data || err.message);
      });
  }, []);
  console.log(story);
  return (
    <>
      {story.map((item, index) => {
        return (
          <div key={index}>
            <div class="rounded-full p-1 bg-gradient-to-tr from-orange-400 via-red-500 to-purple-600">
              <div
                className="w-15 h-15 border-3 rounded-full  bg-cover bg-center border-black"
                style={{
                  backgroundImage: `url(http://localhost:3000/uploads/${item.dp})`,
                }}
              ></div>
            </div>
            <p className="text-white text-[13px] text-center">{item.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default Status;
