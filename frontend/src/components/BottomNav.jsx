import axios from "axios";
import { Home, Search, Clapperboard, Send } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BottomNav() {
  const [dp, setdp] = useState("");
  const [data, setdata] = useState("");
  const fileref = useRef(null);
  function handleClapperboardClick() {
    fileref.current.click();
  }

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

        setdp(userdata.dp);
      })
      .catch((err) => {
        console.error("Authentication Failed ❌", err);
      });
  }, []);

  const handleFileChange = (e) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const file = e.target.files[0];
    if (file) {
      const post = new FormData();
      post.append("post", file);
      axios
        .post("http://localhost:3000/api/user/post", post, {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": token,
          },
        })
        .then((res) => {
          setdata(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  console.log(data, "45515121212121212125555");
  return (
    <div
      className="bg-black"
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "11px",
      }}
    >
      <Link to={"/"}>
        <Home color="white" fill="white" />
      </Link>

      <Search color="white" />

      <Clapperboard
        color="white"
        onClick={handleClapperboardClick}
        style={{ cursor: "pointer" }}
      />

      <Send color="white" />

      <Link to={"/profile"}>
        <img
          src={`http://localhost:3000/uploads/${dp}`} // ✅ full image path
          alt="Profile DP"
          className="w-6 h-6 rounded-full border-2 border-white object-cover"
        />
      </Link>

      {/* Hidden input:file */}
      <input
        type="file"
        ref={fileref}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default BottomNav;
