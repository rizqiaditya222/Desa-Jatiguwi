import React from "react";

interface PrimaryCardProps {
  Judul: string;
  deskripsi: string;
  date: string;
  imageUrl?: string;
  arrowIcon?: string;
}

const PrimaryCard: React.FC<PrimaryCardProps> = ({
  Judul,
  deskripsi,
  date,
  imageUrl,
  arrowIcon = "svg/right_arrow.png",
}) => {
  return (
    <div className="p-4  flex flex-col w-full py-6 text-[#0E4D45] border-2 rounded-lg border-[#0E4D45]">
      <div className="flex items-center justify-between w-full">
        <h2 className="pb-4 text-2xl font-bold md:text-4xl">{Judul}</h2>
        <img
          src="/svg/right-arrow-alt.svg"
          alt="Right arrow"
          className="w-6 h-6 md:w-8 md:h-8 fill-[#0E4D45]"
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">{deskripsi}</p>
      </div>

      <div className="flex items-center gap-2">
        <img
          src="/svg/date-fill.svg"
          alt="Date"
          className="w-6 h-6 rounded-full fill-[#0E4D45]"
        />

        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default PrimaryCard;
