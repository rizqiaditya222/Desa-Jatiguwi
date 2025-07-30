"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

interface NavButtonProps {
  text: string;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text, href }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href && !href.includes("#");

  const handleClick = (e: React.MouseEvent) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");

      if (pathname === path || path === "") {
        // Jika sudah di halaman yang sama, scroll langsung
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Jika di halaman lain, arahkan ke halaman dengan hash
        e.preventDefault();
        router.push(`/${hash ? `#${hash}` : ""}`);
      }
    }
  };

  return (
    <Link href={href} scroll={false} onClick={handleClick}>
      <button
        className={`w-24 font-semibold size-24 hover:text-[#0E4D45] hover:scale-110 hover:ease-in-out duration-100 ${
          isActive ? "border-b-2 text-[#0E4D45] border-[#0E4D45]" : ""
        }`}
      >
        {text}
      </button>
    </Link>
  );
};

export default NavButton;
