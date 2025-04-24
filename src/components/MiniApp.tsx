"use client";

import { useState } from "react";
import { useFrameSDK } from "../hooks/useFrameSDK";
import { DaimoPayButton } from "@daimo/pay";
import { baseUSDC } from "@daimo/contract";
import { getAddress } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

const toAddress = "0x6210177c80FF902dbb58D1fDC3b47281AA4f2Ab9";

export default function MiniApp() {
  const { isSDKLoaded } = useFrameSDK();
  const [amount, setAmount] = useState("42.069");
  const { address } = useAccount();
  const { data: balanceRaw } = useReadContract({
    address: getAddress(baseUSDC.token),
    abi: [
      {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ type: "address", name: "owner" }],
        outputs: [{ type: "uint256", name: "" }],
      },
    ] as const,
    functionName: "balanceOf",
    args: [toAddress!],
  });
  const balance = balanceRaw ? Number(balanceRaw) / 1e6 : 0;
  const progress = Math.min((balance / 2000) * 100, 100);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  const presetAmounts = ["10", "50", "200"];
  const amtNum = parseFloat(amount) || 0;
  const sponsorshipOptions = [
    { amount: 5, label: "endless gratitude" },
    { amount: 20, label: "Hugs and I'll add your pfp to this mini app" },
    { amount: 30, label: "vibes.engineering early access NFT" },
    { amount: 69, label: "thanks I guess? 👉 👈" },
    { amount: 200, label: "Get an ad spot in this mini app" },
    { amount: 420, label: "Your logo, brand or memecoin: I will run around in your t-shirts for two days (I will print if you don't have any)" },
    { amount: 690, label: "Sponsored vlog for your brand / memecoin" },
    { amount: 1000, label: "I will build a miniapp for you" },
    { amount: 1500, label: "Your brand ambassador for a week" },
  ];
  const currentIndex = sponsorshipOptions.reduce(
    (acc, opt, idx) => (amtNum >= opt.amount ? idx : acc),
    -1
  );

  const onSuccess = () => {
    console.log('onSuccess');
  };

  return (
    <>
      <div className="relative w-[400px] mx-auto py-6 px-6 text-left bg-gradient-to-br from-purple-800 via-purple-500 to-pink-400 text-white rounded-xl shadow-lg overflow-hidden">
      {/* background emojis */}
      <span style={{ position: "absolute", top: "0.5rem", left: "-2rem", animation: "moveLR 8s linear infinite" }} className="text-3xl">🚀</span>
      <span style={{ position: "absolute", bottom: "1rem", left: "-3rem", animation: "moveLR 12s linear infinite" }} className="text-2xl">🌌</span>
      <span style={{ position: "absolute", bottom: "2rem", left: "-2rem", animation: "moveLR 6s linear infinite" }} className="text-2xl">💜</span>
      <h1 className="text-4xl font-extrabold mb-4">Help Hellno fly to Farcon ✈️</h1>
      <div className="mb-4">
        <p className="text-lg font-medium">Your USDC Balance: ${balance.toFixed(2)}</p>
        <Progress value={progress} className="w-full mt-1" />
      </div>
      <div className="mb-6">
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
          className="w-full text-left text-5xl font-extrabold bg-black bg-opacity-20 border border-purple-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
        />
        <div className="flex justify-center space-x-2 mb-4">
          {presetAmounts.map((val) => (
            <button
              key={val}
              onClick={() => setAmount(`${val}.00`)}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors"
            >
              ${val}
            </button>
          ))}
        </div>
        <div className="flex justify-center px-8 py-4 bg-pink-500 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-pink-400 transition-colors animate-pulse">
          <DaimoPayButton.Custom
            appId={process.env.NEXT_PUBLIC_DAIMO_PAY_KEY || "pay-demo"}
            toChain={baseUSDC.chainId}
            toUnits={amount !== "" ? Number(amount).toFixed(2) : "0.00"}
            toToken={getAddress(baseUSDC.token)}
            toAddress={toAddress}
            onPaymentStarted={(e) => console.log("Payment started", e)}
            onPaymentCompleted={(e) => {console.log("Payment completed", e); onSuccess(); } }
            closeOnSuccess
          >
            {({ show: showDaimoModal }) => (
              <Button
                className="w-full"
                size="lg"
              >
                Support hellno.eth
              </Button>
             )}
          </DaimoPayButton.Custom>
        </div>
      </div>
      <div className="space-y-4 text-left mt-4">
        <h2 className="text-xl font-semibold">Sponsorship Options</h2>
        <ul className="text-left list-none space-y-1">
          {sponsorshipOptions.map((option, idx) => {
            const unlocked = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <li
                key={option.amount}
                onClick={() => setAmount(option.amount.toFixed(2))}
                className={`cursor-pointer flex text-left px-4 py-2 rounded transition-colors ${
                  isCurrent
                    ? "bg-pink-500 text-white font-bold"
                    : unlocked
                    ? "text-white"
                    : "text-gray-400 opacity-50"
                }`}
              >
                <span className="font-semibold">${option.amount}:</span>
                <span>{option.label}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 font-semibold">Total fundraising goal: $2000</p>
      </div>
    </div>
    <style jsx>{`
      @keyframes moveLR {
        0% { transform: translateX(0); }
        100% { transform: translateX(110%); }
      }
    `}</style>
  </>
  );
}
