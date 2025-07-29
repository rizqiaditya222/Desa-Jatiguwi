import Link from "next/link";

interface PrimaryLinkButtonProps {
  text: string;
  href: string;
  className?: string;
}

const SecondaryLinkButton: React.FC<PrimaryLinkButtonProps> = ({
  text,
  href,
  className = "",
}) => {
  return (
    <Link href={href}>
      <button
        className={`font-semibold h-fit px-7 py-3 bg-[#fafafa] border border-2 border-[#0E4D45] rounded-xl text-[#0E4D45] hover:text-[#63be86] hover:border-[#63be86] ${className}`}
      >
        {text}
      </button>
    </Link>
  );
};

export default SecondaryLinkButton;
