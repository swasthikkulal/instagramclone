import { LayoutGrid, Clapperboard, UserRound } from "lucide-react";

function ProfileTabs() {
  return (
    <div className="flex justify-around bg-black p-2">
      <LayoutGrid color="white" size={24} strokeWidth={2} />
      <Clapperboard color="white" size={24} strokeWidth={2} />
      <UserRound color="white" size={24} strokeWidth={2} />
    </div>
  );
}

export default ProfileTabs;
