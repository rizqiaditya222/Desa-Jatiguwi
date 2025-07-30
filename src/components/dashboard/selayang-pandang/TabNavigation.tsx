import React from 'react';

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

    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`py-2 px-1 border-b-2 font-semibold text-md whitespace-nowrap ${
                            activeTab === tab.id
                                ? 'border-[#0E4D45] text-[#0E4D45]'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default TabNavigation;