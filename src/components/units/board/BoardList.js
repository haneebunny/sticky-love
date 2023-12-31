"use client";

import { readBoards } from "@/common/api/firebase";
import { Josa } from "@/common/api/function";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { BsFillSearchHeartFill } from "react-icons/bs";

import Memo from "./Memo";

export default function BoardList() {
  const [memos, setMemos] = useState();
  const [ratio, setRatio] = useState(1);
  const [screen, setScreen] = useState();

  let posX = 0;
  let posY = 0;

  let originalX = 0;
  let originalY = 0;

  useEffect(() => {
    const getMemos = async () => {
      try {
        const boards = await readBoards();
        const boardsArray = Object.keys(boards).map((key) => boards[key]);

        setMemos(boardsArray);
      } catch (error) {
        console.log("Error occurred while fetching memos:", error);
      }
    };

    getMemos();
  }, [readBoards]);

  const handleWheelEvent = (e) => {
    // deltaY 휠을 아래로 굴리면 양수, 위로 굴리면 음수
    // 휠의 방향에 따라 ratio를 증가/감소 시키되, 최소 0.2배까지만 줄어들도록. (0.2보다 크거나 같으면 새로운 ratio 할당, 아니면 0.2로 유지)
    setRatio((ratio) => (ratio >= 0.7 ? ratio + 0.001 * e.deltaY : 0.7));
  };

  const handleDragStart = (e) => {
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);

    posX = e.clientX;
    posY = e.clientY;
  };

  const handleDrag = (e) => {
    const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
    const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

    e.target.style.left = limitX
      ? `${e.target.offsetLeft + (e.clientX - posX)}px`
      : "0px";
    e.target.style.top = limitY
      ? `${e.target.offsetTop + (e.clientY - posY)}px`
      : "0px";

    posX = limitX ? e.clientX : 0;
    posY = limitY ? e.clientY : 0;
  };

  const handleDragEnd = (e) => {
    const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
    const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

    e.target.style.left = limitX
      ? `${e.target.offsetLeft + (e.clientX - posX)}px`
      : "0px";
    e.target.style.top = limitY
      ? `${e.target.offsetTop + (e.clientY - posY)}px`
      : "0px";

    setScreen({ top: e.target.style.top, left: e.target.style.left });
  };
  return (
    <Frame>
      <Container
        ratio={ratio}
        // onWheel={handleWheelEvent}
        // onDragStart={handleDragStart}
        // onDrag={handleDrag}
        // onDragEnd={handleDragEnd}
        // draggable
      >
        <div className=" w-screen grid grid-cols-3">
          {Array(memos)[0]?.map((memo) => (
            <Memo
              key={memo?.boardId}
              name={memo?.name}
              content={memo?.content}
            />
          ))}
          <div className="absolute top-5 left-1/4 flex flex-col items-center bg-white shadow-md p-3 rounded-2xl">
            <BsFillSearchHeartFill />
            <div onClick={() => setRatio((ratio) => ratio + 0.25)}>+</div>
            <div onClick={() => setRatio(1)}>1.0</div>
            <div onClick={() => setRatio((ratio) => ratio - 0.25)}>-</div>
          </div>
          <div>{Josa("하니", "이")}</div>
          <div className="fixed bottom-1/2 left-[47%]">
            <AddMemoButton
            // className="bg-amber-400  bg-opacity-60 p-5 rounded-[50px] text-lg text-amber-900 hover:bg-amber-200 hover:bg-opacity-60"
            >
              +
            </AddMemoButton>
          </div>
        </div>
      </Container>
    </Frame>
  );
}

const Frame = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`;

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: ${(props) => 200 / props.ratio}%;
  height: ${(props) => 200 / props.ratio}%;
  transform: scale(${(props) => props.ratio});
  transform-origin: left top;
`;

const AddMemoButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: hsla(168, 40%, 72%, 0.749);
  padding: 20px;
  border-radius: 50%;
  font-size: x-large;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.5;
    transform: scale(1.1);
  }

  transition: all 0.2s;
`;
