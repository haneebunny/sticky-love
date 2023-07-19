"use client";

import { useState } from "react";

export default function HaniPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyInterest, setMonthlyInterest] = useState(0);

  const calculateInterest = () => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const monthlyInterestAmount = loanAmount * monthlyInterestRate;
    setMonthlyInterest(monthlyInterestAmount);
  };

  return (
    <div className="flex flex-col m-auto p-5 w-[700px] bg-slate-50">
      <h1 className="text-xl">대출 이자 계산기</h1>
      <div className="p-10 flex flex-col gap-10">
        <div className="flex gap-3">
          <label htmlFor="loanAmount" className="form-label">
            대출 금액 (원)
          </label>
          <input
            type="number"
            className=" bg-yellow-100 rounded-xl px-2"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="interestRate" className="form-label">
            금리 (%)
          </label>
          <input
            type="number"
            className=" bg-yellow-100 rounded-xl px-2"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-amber-200 w-24 rounded-lg p-3 m-auto"
          onClick={calculateInterest}
        >
          계산하기
        </button>
        {monthlyInterest > 0 && (
          <div className="mt-3">
            <p>한 달에 내야하는 이자: {monthlyInterest.toFixed(2)}원</p>
          </div>
        )}
      </div>
    </div>
  );
}
