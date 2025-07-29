import Link from "next/link";

interface NavButtonProps {
  text: string;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text, href }) => {
  return (
    <Link href={href}>
      <button className="font-semibold hover:text-[#0E4D45]">{text}</button>
    </Link>
  );
};

export default NavButton;
