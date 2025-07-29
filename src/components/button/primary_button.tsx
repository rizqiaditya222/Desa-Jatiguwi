import Link from "next/link";

interface PrimaryLinkButtonProps {
  text: string;
  href: string;
  className?: string;
}

const PrimaryLinkButton: React.FC<PrimaryLinkButtonProps> = ({
  text,
  href,
  className = "",
}) => {
  return (
    <Link href={href}>
      <button
        className={`font-semibold h-fit px-7 py-3 bg-[#0E4D45] rounded-xl text-white hover:bg-[#63be86] ${className}`}
      >
        {text}
      </button>
    </Link>
  );
};

export default PrimaryLinkButton;
