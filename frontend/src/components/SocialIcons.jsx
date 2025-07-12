import React from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

const SocialIcons = () => {
  return (
    <div className="flex gap-60  text-white">
      <div className="flex gap-4">
        <Heart size={24} />
        <MessageCircle size={24} />
        <Send size={24} />
      </div>
      <Bookmark size={24} />
    </div>
  );
};

export default SocialIcons;
