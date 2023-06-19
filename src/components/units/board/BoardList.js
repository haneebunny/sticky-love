"use client";

import { readBoards } from "@/api/firebase";
import { useEffect, useState } from "react";
import Memo from "./Memo";

export default function BoardList() {
  const [memos, setMemos] = useState();

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

  console.log(Array(memos)[0]);
  return (
    <div className="grid grid-cols-3">
      {Array(memos)[0]?.map((memo) => (
        <Memo key={memo?.boardId} name={memo?.name} content={memo?.content} />
      ))}
    </div>
  );
}
