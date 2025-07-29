import Link from 'next/link';
import { PengumumanArticle } from '@/types/pengumuman';

interface SidebarProps {
  otherAnnouncements: PengumumanArticle[];
}

const PengumumanSidebar = ({ otherAnnouncements }: SidebarProps) => {
  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-[#07433C] mb-6">Pengumuman Lainnya</h2>
        <hr className="border-[#0E4D45] border-t-2 mb-6" />
        <div className="space-y-4">
          {otherAnnouncements.length > 0 ? (
            otherAnnouncements.map((item) => (
              <Link key={item.id} href={`/pengumuman/${item.slug}`} className="block group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-[#07433C] group-hover:text-teal-600 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {item.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>📅</span>
                        <span>
                          {item.date?.toDate().toLocaleDateString('id-ID', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-teal-600 ml-2 flex-shrink-0 text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600">Tidak ada pengumuman lainnya.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PengumumanSidebar;