"use client";

import { useState } from "react";
import { useFrameSDK } from "~/hooks/useFrameSDK";
import { DaimoPayButton } from "@daimo/pay";
import { baseUSDC } from "@daimo/contract";
import { getAddress } from "viem";

export default function MiniApp() {
  const { isSDKLoaded } = useFrameSDK();
  const [amount, setAmount] = useState("25.00");

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  const presetAmounts = ["10", "50", "100"];

  return (
    <div className="w-[400px] mx-auto py-4 px-4 space-y-4 text-center">
      <h1 className="text-2xl font-bold">Help Hellno Fly to Farcon</h1>
      <input
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d*\.?\d{0,2}$/.test(val)) {
            setAmount(val);
          }
        }}
        className="w-full text-center text-3xl font-semibold border rounded-md border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-center space-x-2">
        {presetAmounts.map((val) => (
          <button
            key={val}
            onClick={() => setAmount(`${val}.00`)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            ${val}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <DaimoPayButton
          appId={process.env.NEXT_PUBLIC_DAIMO_PAY_KEY || "pay-demo"}
          toChain={baseUSDC.chainId}
          toUnits={amount !== "" ? Number(amount).toFixed(2) : "0.00"}
          toToken={getAddress(baseUSDC.token)}
          toAddress="0x6210177c80FF902dbb58D1fDC3b47281AA4f2Ab9"
          onPaymentStarted={(e) => console.log("Payment started", e)}
          onPaymentCompleted={(e) => console.log("Payment completed", e)}
        />
      </div>
    </div>
  );
}
