import React, { useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { label: "Total Supply", value: "100-B AUSDC" },
  { label: "Market Supply", value: "60-B AUSDC", percentage: "60%" },
  { label: "Developer", value: "20-B AUSDC", percentage: "20%" },
  { label: "AirDrop", value: "15-B AUSDC", percentage: "15%" },
  { label: "INVESTER", value: "5-B AUSDC", percentage: "5%" },
];

const colors = ["#e98873", "#c6ec7d", "#7f8e7e", "#d9e8d8"];

export default function TokenomicsPage() {
  const [hovered, setHovered] = useState(null);

  const circleData = [
    { percent: 60, offset: 0, color: colors[0], label: "Market Supply: 60%" },
    { percent: 20, offset: -70, color: colors[1], label: "Developer: 20%" },
    { percent: 15, offset: -90, color: colors[2], label: "AirDrop: 15%" },
    { percent: 5, offset: -105, color: colors[3], label: "INVESTER: 5%" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6 text-indigo-500">
      <div className="bg-gray-900 border-4 border-indigo-600 p-6 rounded-2xl w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
        {/* Chart Section */}
        <div className="relative w-72 h-72">
          <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
            {circleData.map((slice, idx) => (
              <circle
                key={idx}
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke={slice.color}
                strokeWidth="3.5"
                strokeDasharray={`${slice.percent} ${100 - slice.percent}`}
                strokeDashoffset={slice.offset}
                strokeLinecap="round"
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer", transition: "all 0.3s ease-in-out" }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-extrabold text-indigo-500">
              100-B <br /> AUSDC
            </span>
            {hovered !== null && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm bg-indigo-700 text-white px-3 py-1 rounded shadow-lg"
              >
                {circleData[hovered].label}
              </motion.div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md space-y-4"
        >
          {sections.map((section, index) => {
            const color = colors[index - 1] || "#6366f1"; // skip Total Supply
            const borderStyle =
              section.label === "Total Supply"
                ? "border-indigo-500"
                : "";

            return (
              <div
                key={index}
                className={`rounded-xl py-4 px-6 shadow-md [backdrop-filter:blur(10px)] bg-gray-900 hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 ${
                  section.label === "Total Supply"
                    ? "border border-indigo-500"
                    : ""
                }`}
                style={{
                  border: section.label !== "Total Supply" ? `2px solid ${color}` : undefined,
                }}
              >
                <p className="text-lg font-semibold">
                  {section.label}{section.value && ` : ${section.value}`}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
