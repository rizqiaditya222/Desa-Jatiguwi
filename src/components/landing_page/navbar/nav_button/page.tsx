"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface NavButtonProps {
  text: string;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text, href }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Perbaikan: Cocokkan path dasar (termasuk dynamic routes)
  const cleanHref = href.split("#")[0]; // hapus hash untuk pencocokan
  const isActive = cleanHref
    ? pathname === cleanHref ||
      pathname?.startsWith(`${cleanHref}/`) ||
      (cleanHref === "/content" &&
        (pathname?.startsWith("/berita/") ||
          pathname?.startsWith("/pengumuman/")))
    : false;

  const handleClick = (e: React.MouseEvent) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (pathname === path || path === "") {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else {
        e.preventDefault();
        router.push(href);
      }
    }
  };

  return (
    <Link href={href} scroll={false} onClick={handleClick}>
      <button
        className={`flex justify-center items-center text-center  font-semibold hover:text-[#0E4D45] hover:scale-110 transition-all ${
          isActive ? "border-b-2 border-[#0E4D45] text-[#0E4D45]" : ""
        }`}
      >
        {text}
      </button>
    </Link>
  );
};
export default NavButton;
