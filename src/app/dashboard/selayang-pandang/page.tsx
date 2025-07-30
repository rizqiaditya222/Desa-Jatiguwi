'use client'
import React, { useState } from 'react';
import TabNavigation from '@/components/selayang-pandang/TabNavigation';
import LahanEdit from '@/components/selayang-pandang/LahanEdit';
import DemografisEdit from '@/components/selayang-pandang/DemografisEdit';
import AgamaEdit from '@/components/selayang-pandang/AgamaEdit';
import ProfesiEdit from '@/components/selayang-pandang/ProfesiEdit';

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
        <div className="px-24 mx-auto px-4 sm:px-6 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E4D45] pb-6">
                Edit Selayang Pandang
            </h1>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden px-6 pb-12">
                <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="mt-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default EditSelayangPandangSidebar;