import { User, Plus } from "lucide-react";

function AddUserIcon() {
  return (
    <div className="relative w-6 h-6 bg-[#2f3336]">
      <User color="white" size={18} strokeWidth={2} />
      <Plus
        color="white"
        size={12}
        strokeWidth={2}
        className="absolute top-0 left-0"
      />
    </div>
  );
}

export default AddUserIcon;
