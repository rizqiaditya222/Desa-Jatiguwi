import React from "react";
import Link from "next/link";

interface SecondaryCardProps {
  Judul: string;
  deskripsi: string;
  date: string;
  href: string;
}

const SecondaryCard: React.FC<SecondaryCardProps> = ({
  Judul,
  deskripsi,
  date,
  href,
}) => {
  return (
    <Link href={href} className="flex flex-col w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-start text-white border-2 rounded-lg border-[#0E4D45] bg-[#0E4D45] hover:border-[#63be86] hover:bg-[#63be86] transition duration-200 ease-in-out group">
      
      {/* Title */}
      <div className="flex w-full mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase leading-tight">
          {Judul}
        </h2>
      </div>

      {/* Description */}
      <div className="mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm md:text-base text-[#fafafa] line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {deskripsi}
        </p>
      </div>

      {/* Date with Calendar Icon */}
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white flex-shrink-0"
        >
          <g fill="none">
            <path
              fill="currentColor"
              d="M2 9c0-1.886 0-2.828.586-3.414C3.172 5 4.114 5 6 5h12c1.886 0 2.828 0 3.414.586C22 6.172 22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414C3.172 22 4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586C22 20.828 22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M7 3v3m10-3v3"
            />
          </g>
        </svg>
        <p className="text-xs sm:text-sm md:text-base">
          {date}
        </p>
      </div>
    </Link>
  );
};

export default SecondaryCard;