"use client";

import { readBoards, writeBoard } from "@/common/api/firebase";
import { addRandomModifier, isEmpty } from "@/common/api/function";
import { useRouter } from "next/router";
import { useState } from "react";
import Memo from "./Memo";

export default function BoardNew() {
  const router = useRouter();
  const [inputs, setInputs] = useState();
  const handleChangeInput = (event) => {
    const { value, id } = event.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const handleSendButton = () => {
    // 객체에 하나라도 빈 값이 있는지 확인
    if (isEmpty(inputs)) {
      alert("빈 종이 붙이지 마세요~!");
      return;
    }

    if (inputs?.content.length < 10) {
      alert("조금 더 성의있게 써주세요...흑흑");
      return;
    }
    console.log(inputs);

    try {
      // firebase 실시간 데이터 베이스 api로 만든 함수
      writeBoard(addRandomModifier(inputs?.name), inputs?.content);
      setInputs({
        name: "",
        content: "",
      });
    } catch (e) {
      alert(e.message);
      console.error(e);
    } finally {
      alert("잘 붙여졌다!"); // 목록으로 이동해야 함
      router.push("/board");
    }
  };

  return (
    <div>
      <div className=" bg-amber-200 max-w-[400px] min-h-[350px] p-10 shadow-lg">
        <div className=" bg-amber-200 max-w-[400px] min-h-[350px] p-10 shadow-lg">
          <textarea
            id="content"
            value={inputs?.content || ""}
            onChange={handleChangeInput}
            maxLength="500"
            className="w-[300px] h-40 resize-none border-b-2 border-amber-400 bg-transparent focus:border-amber-400 outline-none"
          />
          <input
            id="name"
            value={inputs?.name || ""}
            onChange={handleChangeInput}
            maxLength="13"
            className="h-10 border-b-2 border-amber-400 bg-transparent focus:border-amber-400 outline-none"
          />
          가
          <button onClick={handleSendButton} className="">
            붙이기
          </button>
        </div>
      </div>
    </div>
  );
}
