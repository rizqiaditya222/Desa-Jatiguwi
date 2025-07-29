"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavButtonProps {
  text: string;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <button
        className={`w-24 font-semibold hover:text-[#0E4D45] hover:scale-110 hover:ease-in-out duration-100 ${
          isActive
            ? "border-b-2 text-[#0E4D45] hover:pb-2 border-[#0E4D45]"
            : ""
        }`}
      >
        {text}
      </button>
    </Link>
  );
};
export default NavButton;
