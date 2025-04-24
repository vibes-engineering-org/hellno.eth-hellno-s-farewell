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
    <div className="relative w-[400px] mx-auto py-6 px-6 space-y-6 text-center bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 text-white rounded-xl shadow-lg overflow-hidden">
      {/* background emojis */}
      <span className="absolute top-2 left-4 animate-bounce text-3xl">🚀</span>
      <span className="absolute bottom-4 right-6 animate-pulse text-2xl">🌌</span>
      <span className="absolute bottom-8 left-8 animate-spin text-2xl">💜</span>
      <h1 className="text-3xl font-extrabold">Help Hellno travel from Europoor to NYC ✈️</h1>
      <div className="space-y-4 text-left mt-4">
        <h2 className="text-xl font-semibold">Sponsorship Options</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><span className="font-semibold">$1:</span> Eternal gratitude</li>
          <li><span className="font-semibold">$20:</span> Hugs</li>
          <li><span className="font-semibold">$30:</span> vibes.engineering early access</li>
          <li><span className="font-semibold">$69:</span> I will build a miniapp for you using vibes</li>
          <li><span className="font-semibold">$100:</span> Premium emoji support</li>
          <li><span className="font-semibold">$250:</span> Exclusive digital postcard</li>
          <li><span className="font-semibold">$420:</span> Yes we can</li>
          <li><span className="font-semibold">$500:</span> I will print a t-shirt with your logo / brand / memecoin and wear it for one day</li>
          <li><span className="font-semibold">$750:</span> Sponsor shoutout</li>
          <li><span className="font-semibold">$2000:</span> Brand ambassador for a week</li>
        </ul>
        <p className="mt-2 font-semibold">Total fundraising goal: $2000</p>
      </div>
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
        className="w-full text-center text-3xl font-semibold bg-black bg-opacity-20 border border-purple-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <div className="flex justify-center space-x-2">
        {presetAmounts.map((val) => (
          <button
            key={val}
            onClick={() => setAmount(`${val}.00`)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors"
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
