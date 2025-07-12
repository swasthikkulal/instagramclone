import React from "react";
import Icons from "./Icons";

const Navbar = () => {
  return (
    <div className="flex justify-between p-3">
      <img src="logo.png" alt="" width={120} />
      <Icons />
    </div>
  );
};

export default Navbar;
