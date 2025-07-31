// components/common/WilayahLahanCard.tsx
import React from "react";

interface WilayahLahanCardProps {
  title: string;
  data: { label: string; value: number | string; satuan?: string }[];
}

const WilayahLahanCard: React.FC<WilayahLahanCardProps> = ({ title, data }) => {
  return (
    <div className="w-full flex flex-col items-center p-8  border-[#0E4D45] bg-gray-200 rounded-xl text-[#0E4D45] shadow-md">
      <h1 className="mb-6 text-2xl md:text-3xl font-semibold">{title}</h1>
      <div className="w-full max-w-2xl space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30"
          >
            <p className="text-lg md:text-xl font-medium">{item.label}</p>
            <p className="text-lg md:text-xl font-semibold">
              {item.value} {item.satuan ?? ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WilayahLahanCard;