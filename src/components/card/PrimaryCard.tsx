import React from "react";
import Link from 'next/link'; // Import Link

interface PrimaryCardProps {
  Judul: string;
  deskripsi: string;
  date: string;
  href: string; // Add href prop
}

const PrimaryCard: React.FC<PrimaryCardProps> = ({
  Judul,
  deskripsi,
  date,
  href, // Destructure href
}) => {
  return (
    // Change button to Link component
    <Link href={href} className="px-8 flex flex-col text-start w-full py-4 text-[#0E4D45] border-2 rounded-lg border-[#0E4D45] hover:text-[#63be86] hover:border-[#63be86] transition duration-200 ease-in-out group">
      <div className="flex justify-between w-full">
        <h2 className="pb-4 text-xl font-bold uppercase md:text-2xl group-hover:text-[#7ABCB0]">
          {Judul}
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-6 h-6 md:w-8 md:h-8 fill-[#0E4D45] flex-shrink-0 group-hover:fill-[#7ABCB0] transition-colors duration-100"
        >
          <path d="m18.72 6.78l-1.44 1.44L24.063 15H4v2h20.063l-6.782 6.78l1.44 1.44l8.5-8.5l.686-.72l-.687-.72l-8.5-8.5z" />
        </svg>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 group-hover:text-[#7ABCB0] line-clamp-3">
          {deskripsi}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 md:w-8 md:h-8 fill-[#0E4D45] group-hover:fill-[#7ABCB0] transition-colors duration-100"
        >
          <g fill="none">
            <path
              fill="currentColor"
              d="M2 9c0-1.886 0-2.828.586-3.414C3.172 5 4.114 5 6 5h12c1.886 0 2.828 0 3.414.586C22 6.172 22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414C3.172 22 4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586C22 20.828 22 19.886 22 18v-5c0-.471 0-.707-.854.146C2 12.293 2 12.53 2 13z"
            />
            <path stroke="currentColor" d="M7 3v3m10-3v3" />
          </g>
        </svg>

        <p className="text-sm text-gray-500 group-hover:text-[#7ABCB0] transition-colors duration-100">
          {date}
        </p>
      </div>
    </Link>
  );
};

export default PrimaryCard;