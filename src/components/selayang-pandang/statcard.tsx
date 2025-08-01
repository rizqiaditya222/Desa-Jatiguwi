// components/common/StatCard.tsx
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  bg?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, bg = false }) => {
  return (
    <div
      className={`p-2 text-lg font-semibold border-2 rounded-lg border-[#0E4D45] ${
        bg ? "bg-[#D2E0C6]" : "bg-white"
      }`}
    >
      <h1 className="text-xl md:text-2xl font-bold">{value}</h1>
      <p className="text-base md:text-lg font-semibold">{title}</p>
    </div>
  );
};

export default StatCard;