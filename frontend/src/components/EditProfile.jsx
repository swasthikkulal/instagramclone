import React, { useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const nav = useNavigate();
  const [data, setdata] = useState({
    name: "",
    username: "",
    bio: "",
    dp: null,
  });

  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  function handleDp(e) {
    const file = e.target.files[0];
    setdata({ ...data, dp: file });
    setPreview(URL.createObjectURL(file)); // show preview
  }

  function handleSubmit() {
    const formData = new FormData();
    formData.append("dp", data.dp);
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;
    axios
      .post("http://localhost:3000/api/dp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": token,
        },
      })
      .then((res) => {
        alert("Profile updated successfully!");
        console.log("Response:", res.data);
        nav("/profile");
      })
      .catch((err) => {
        alert("Upload failed");
        console.error("Error:", err);
      });
  }

  return (
    <div className="bg-black w-full h-screen p-4">
      <p className="text-xl text-white font-bold">Edit Profile</p>

      <div className="p-10 flex flex-col items-start">
        <div className="relative w-20 h-20 border rounded-full border-gray-600 bg-white overflow-hidden mx-22">
          {/* Profile Preview */}
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <Plus color="black" size={24} strokeWidth={3} />
            </div>
          )}

          {/* File Input */}
          <input
            type="file"
            name="dp"
            accept="image/*"
            onChange={handleDp}
            className="absolute inset-0 opacity-0 z-20 cursor-pointer"
          />
        </div>
      </div>

      <div className="border border-gray-600 w-full p-2 rounded-md">
        <p className="text-gray-400 text-sm font-semibold">Name</p>
        <input
          type="text"
          name="name"
          value={data.name}
          className="w-full text-white bg-transparent outline-none"
          onChange={handleChange}
        />
      </div>

      <div className="border border-gray-600 w-full p-2 rounded-md mt-4">
        <p className="text-gray-400 text-sm font-semibold">Username</p>
        <input
          type="text"
          name="username"
          value={data.username}
          className="w-full text-white bg-transparent outline-none"
          onChange={handleChange}
        />
      </div>

      <div className="border border-gray-600 w-full p-2 rounded-md mt-4">
        <p className="text-gray-400 text-sm font-semibold">Bio</p>
        <input
          type="text"
          name="bio"
          value={data.bio}
          className="w-full text-white bg-transparent outline-none"
          onChange={handleChange}
        />
      </div>

      <div
        className="mt-6 w-fit px-4 py-2 bg-red-500 text-white font-semibold rounded-md cursor-pointer"
        onClick={handleSubmit}
      >
        Save Changes
      </div>
    </div>
  );
};

export default EditProfile;
