import Link from 'next/link';

interface HeaderProps {
  title: string;
}

const PengumumanHeader = ({ title }: HeaderProps) => {
  return (
    <div className="bg-white border-t border-gray-200">
      <div className="px-24 mx-auto px-4 py-3">
        <nav className="text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-teal-600">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/dashboard/pengumuman" className="hover:text-teal-600">Pengumuman</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{title}</span>
        </nav>
      </div>
    </div>
  );
};

export default PengumumanHeader;