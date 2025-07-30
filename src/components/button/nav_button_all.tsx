interface NavButtonProps {
  text: string;
  href: string;
  isSelected?: boolean; // Tambahan
}

const NavButtonAll: React.FC<NavButtonProps> = ({ text, href, isSelected }) => {
  return (
    <button
      className={`font-semibold border-2 rounded-lg
        hover:text-white hover:bg-[#0E4D45] 
        hover:ease-in-out duration-100
        ${
          isSelected
            ? "text-white border-[#0E4D45] bg-[#0E4D45]"
            : "text-[#0E4D45] border-[#0E4D45]"
        }
        w-full sm:w-auto min-w-[120px] px-4 py-2
      `}
    >
      {text}
    </button>
  );
};

export default NavButtonAll;
