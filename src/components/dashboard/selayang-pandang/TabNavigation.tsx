import React, { useEffect } from 'react';

interface TabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'lahan', label: 'Penggunaan Lahan' },
    { id: 'demografis', label: 'Demografis' },
    { id: 'agama', label: 'Persebaran Agama' },
    { id: 'profesi', label: 'Persebaran Profesi' }
  ];

  // Saat tab aktif berubah, pastikan tombolnya otomatis terscroll ke tengah/terlihat
  useEffect(() => {
    const el = document.getElementById(`tab-${activeTab}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeTab]);

  return (
    <div className="border-b border-gray-200 mb-6">
      {/* Wrapper scrollable untuk mobile/tablet */}
      <nav
        role="tablist"
        aria-label="Tab Selayang Pandang"
        className="
          -mb-px flex flex-nowrap items-center
          overflow-x-auto no-scrollbar
          gap-6 sm:gap-8
          snap-x snap-mandatory
          px-2 -mx-2 sm:px-0 sm:mx-0
        "
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={active}
              onClick={() => onTabChange(tab.id)}
              className={[
                "py-2 px-1 border-b-2 font-semibold text-sm sm:text-md whitespace-nowrap snap-start",
                active
                  ? "border-[#0E4D45] text-[#0E4D45]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;
