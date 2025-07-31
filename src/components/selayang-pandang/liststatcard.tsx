// components/common/ListStatCard.tsx
import React from "react";

interface ListStatCardProps {
  title: string;
  items: { label: string; value: string | number }[];
}

const ListStatCard: React.FC<ListStatCardProps> = ({ title, items }) => {
  return (
    <div className="w-full flex flex-col items-center p-8 border-[#0E4D45] bg-gray-200 rounded-xl text-[#0E4D45] shadow-md">
      <h1 className="mb-6 text-2xl md:text-3xl font-semibold">{title}</h1>
      <div className="w-full max-w-2xl space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white flex justify-between items-center w-full pb-4 border rounded-xl p-4 border-[#0E4D45]/30"
          >
            <p className="text-lg md:text-xl font-medium">{item.label}</p>
            <p className="text-lg md:text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListStatCard;