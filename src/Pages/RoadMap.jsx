import React from "react";

const roadmapData = [
  {
    title: "Phase 1: Foundation",
    points: [
      "This is a crypto currency webapp",
      "Market research & competitive analysis",
      "Define core features & wallet requirements",
    ],
    align: "left",
  },
  {
    title: "Phase 2: Development",
    points: [
      "User authentication & KYC integration",
      "Wallet connection (AUS-Networks Wallet , MetaMask, WalletConnect)",
      "Smart contract setup & testing",
    ],
    align: "right",
  },
  {
    title: "Phase 3: Trading Features",
    points: [
      "Implement token swap UI",
      "Live price charts & candlestick patterns",
      "Gas fee calculation & optimization",
    ],
    align: "left",
  },
  {
    title: "Phase 4: Security & Launch",
    points: [
      "Penetration testing & smart contract audit",
      "Token launch & initial liquidity provision",
      "Public beta launch & community feedback",
    ],
    align: "right",
  },
  {
    title: "Phase 5: Scaling & Expansion",
    points: [
      "Multi-chain support (BSC, Polygon, Solana)",
      "Launch mobile app version",
      "Partnerships & staking features",
    ],
    align: "left",
  },
];

const RoadMap = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-20 px-4">
      {/* <h1 className="text-4xl text-center font-bold text-indigo-500 mb-16">
        🚀 Roadmap: Crypto Currency WebApp
      </h1> */}

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-indigo-700 rounded-full transform -translate-x-1/2"></div>

        <div className="flex flex-col gap-16 relative z-10">
          {roadmapData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row ${
                  isLeft ? "sm:justify-start" : "sm:justify-end"
                } items-center`}
              >
                <div
                  className={`bg-gray-800 text-indigo-400 border border-indigo-500 rounded-2xl shadow-lg p-6 w-full sm:w-[320px] transform transition duration-500 hover:scale-105 animate-slide-up ${
                    isLeft ? "sm:mr-auto" : "sm:ml-auto"
                  }`}
                >
                  <h2 className="text-xl font-bold text-indigo-500 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-sm mb-3 text-indigo-300 italic">
                    {item.subtitle}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {item.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                {/* Dot indicator */}
                <div className="bg-indigo-500 w-5 h-5 rounded-full border-4 border-gray-900 absolute left-1/2 transform -translate-x-1/2 z-20 animate-pulse" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
