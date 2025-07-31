'use client'
import React, { useState } from 'react';
import TabNavigation from '@/components/dashboard/selayang-pandang/TabNavigation';
import LahanEdit from '@/components/dashboard/selayang-pandang/LahanEdit';
import DemografisEdit from '@/components/dashboard/selayang-pandang/DemografisEdit';
import AgamaEdit from '@/components/dashboard/selayang-pandang/AgamaEdit';
import ProfesiEdit from '@/components/dashboard/selayang-pandang/ProfesiEdit';

const EditSelayangPandangSidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState('lahan');

    const renderContent = () => {
        switch (activeTab) {
            case 'lahan':
                return <LahanEdit />;
            case 'demografis':
                return <DemografisEdit />;
            case 'agama':
                return <AgamaEdit />;
            case 'profesi':
                return <ProfesiEdit />;
            default:
                return <LahanEdit />;
        }
    };

    return (
        <div className="mx-auto px-4 sm:px-6 py-8 lg:px-8"> {/* Adjusted padding */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0E4D45] pb-4 sm:pb-6"> {/* Adjusted text size and padding */}
                Edit Selayang Pandang
            </h1>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden px-4 pt-4 pb-8 sm:px-8 sm:pt-6 sm:pb-12 lg:px-12"> {/* Adjusted internal padding */}
                <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="mt-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default EditSelayangPandangSidebar;