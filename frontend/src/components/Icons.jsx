import { PlusSquare, Heart } from "lucide-react";

function Icons() {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        background: "black",
        padding: "10px",
      }}
    >
      <PlusSquare color="white" />
      <Heart color="white" />
    </div>
  );
}

export default Icons;
