import { Josa } from "@/common/api/function";
import { useState } from "react";
import Draggable from "react-draggable";

export default function Memo({ name, content }) {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      axis="x,y"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={position}
      grid={[25, 25]}
      scale={1}
      onDrag={(e, data) => trackPos(data)}
    >
      <div className="handle font m-5 bg-amber-200 max-w-[400px] min-h-[350px] p-10 shadow-lg">
        <div className="h-[250px]">{content}</div>

        <p className="flex justify-end cursor-move">{Josa(name, "이")}</p>
      </div>
    </Draggable>
  );
}
