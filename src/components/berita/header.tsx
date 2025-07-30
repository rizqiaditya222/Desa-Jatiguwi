import Link from "next/link";

interface HeaderProps {
  title: string;
}

const BeritaHeader = ({ title }: HeaderProps) => {
  return (
    <div className="bg-gray-200 border-t border-gray-200">
      <div className="px-24 mx-auto px- py-3">
        <nav className="text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-teal-600">
            Beranda
          </Link>
          <span className="mx-2">/</span>
          <Link href="/dashboard/berita" className="hover:text-teal-600">
            Berita
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{title}</span>
        </nav>
      </div>
    </div>
  );
};

export default BeritaHeader;
