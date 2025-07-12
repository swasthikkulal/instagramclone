import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;

    axios
      .get("http://localhost:3000/api/user/post/get", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        const reversed = res.data.data.reverse(); // Latest post first
        setPosts(reversed);
      })
      .catch((error) => console.log("Fetch error:", error.message));
  }, []); // Reloads when `refresh` changes

  return (
    <div>
      <div
        className="w-full h-[44.5vh] bg-black mt-0.5 overflow-scroll"
        id="scroll"
      >
        <div className="flex flex-wrap">
          {posts.map((item, index) => (
            <div
              key={index}
              className="w-30 h-40 m-1 border border-gray-400 bg-cover bg-center"
              style={{
                backgroundImage: `url(http://localhost:3000/uploads/${item.posts})`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileFeed;
