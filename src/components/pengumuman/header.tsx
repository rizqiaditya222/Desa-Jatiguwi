import Link from 'next/link';
import { AlertTriangle, AlertCircle, Info, Tag } from 'lucide-react';

interface HeaderProps {
  title: string;
  category?: string; // tambahkan prop category (opsional)
}

// Helper: normalisasi kategori ke lowercase
function normalizeCategory(cat?: string) {
  if (!cat) return '';
  return String(cat).trim().toLowerCase();
}

// Helper: kelas warna sesuai kategori
function getCategoryClasses(category?: string) {
  const c = normalizeCategory(category);
  switch (c) {
    case 'penting':
      return 'bg-red-100 text-red-700';
    case 'sedang':
      return 'bg-yellow-100 text-yellow-700';
    case 'ringan':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

// Helper: ikon sesuai kategori
function CategoryIcon({ category }: { category?: string }) {
  const c = normalizeCategory(category);

  if (c === 'penting') return <AlertTriangle className="h-4 w-4" />;
  if (c === 'sedang') return <AlertCircle className="h-4 w-4" />;
  if (c === 'ringan') return <Info className="h-4 w-4" />;
  return <Tag className="h-4 w-4" />;
}

function getCategoryLabel(category?: string) {
  const c = normalizeCategory(category);
  if (c === 'penting') return 'Penting';
  if (c === 'sedang') return 'Sedang';
  if (c === 'ringan') return 'Ringan';
  return 'Lainnya';
}

const PengumumanHeader = ({ title, category }: HeaderProps) => {
  return (
    <div className="bg-white border-t border-gray-200">
      <div className="px-4 lg:px-24 mx-auto px-4 py-3">
        <nav className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-teal-600">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/content" className="hover:text-teal-600">Pengumuman</Link>
          <span className="mx-2">/</span>

          <span className="text-gray-800">{title}</span>

          {/* This is where the category is displayed */}
          {category && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryClasses(category)}`}
            >
              <CategoryIcon category={category} />
              <span>{getCategoryLabel(category)}</span>
            </span>
          )}
        </nav>
      </div>
    </div>
  );
};

export default PengumumanHeader;