import Link from 'next/link';
import { NewsArticle } from '@/types/berita';

interface SidebarProps {
  otherAnnouncements: NewsArticle[];
}

const BeritaSidebar = ({ otherAnnouncements }: SidebarProps) => {
  return (
    <div className="lg:w-1/3">
      <div className="bg-[#fafafa] rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-[#0E4D45] mb-6">Pengumuman Lainnya</h2>
        <hr className="border-[#0E4D45] border-t-2 mb-6" />
        <div className="space-y-4">
          {otherAnnouncements.length > 0 ? (
            otherAnnouncements.map((item) => (
              <Link key={item.id} href={`/berita/${item.slug}`} className="block group">
                <div className="bg-[#0E4D45] border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-[#fafafa] mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm font-extralight text-[#fafafa] mb-3 line-clamp-2">
                        {item.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#fafafa]">
                        <span>📅</span>
                        <span className='font-extralight'>
                          {item.date?.toDate().toLocaleDateString('id-ID', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <span className="text-[#fafafa] group-hover:text-teal-600 ml-2 flex-shrink-0 text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-[#fafafa]">Tidak ada pengumuman lainnya.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeritaSidebar;