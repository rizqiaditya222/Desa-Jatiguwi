'use client'
import React, { useState, useEffect } from 'react';
import {
    fetchLahan,
    fetchDemografis,
    fetchAgama,
    fetchProfesi,
    updateLahanLuasByNama,
    updateDemografisByNama,
    updateAgamaJumlahByNama,
    updateProfesiJumlahByNama
} from '@/service/selayang-pandang/selayangPandandService';
import { Lahan } from '@/types/lahan';
import { Demografis } from '@/types/demografis';
import { Agama } from '@/types/agama';
import { Profesi } from '@/types/profesi';


type WithId<T> = T & { id: string };

// Tab Component
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
                        className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
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

const LahanEdit: React.FC = () => {
    const [data, setData] = useState<Array<WithId<Lahan>>>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const result = await fetchLahan();
            setData(result);
        } catch (error) {
            console.error('Error fetching lahan:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: WithId<Lahan>) => {
        setEditingId(item.id);
        setEditValues({ [item.id]: item.luas });
    };

    const handleSave = async (item: WithId<Lahan>) => {
        try {
            const newLuas = editValues[item.id];
            await updateLahanLuasByNama(item.nama, newLuas);
            setData(prev => prev.map(d => d.id === item.id ? { ...d, luas: newLuas } : d));
            setEditingId(null);
            setEditValues({});
        } catch (error) {
            console.error('Error updating lahan:', error);
            alert('Gagal mengupdate data');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValues({});
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Penggunaan Lahan</h3>
            {data.map((item) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{item.nama}</span>
                        {editingId !== item.id && (
                            <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    {editingId === item.id ? (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Luas (Ha)
                                </label>
                                <input
                                    type="number"
                                    value={editValues[item.id] || ''}
                                    onChange={(e) => setEditValues(prev => ({
                                        ...prev,
                                        [item.id]: parseFloat(e.target.value) || 0
                                    }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSave(item)}
                                    className="bg-[#0E4D45] text-white px-3 py-1 rounded text-sm hover:bg-[#0E4D45]"
                                >
                                    Simpan
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-600">
                            <span className="text-lg font-semibold">{item.luas}</span> Ha
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Demografis Edit Component
const DemografisEdit: React.FC = () => {
    const [data, setData] = useState<Array<WithId<Demografis>>>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDusun, setSelectedDusun] = useState<string>('');
    const [editValues, setEditValues] = useState<Partial<Demografis>>({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const result = await fetchDemografis();
            setData(result);
        } catch (error) {
            console.error('Error fetching demografis:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDusunSelect = (dusunId: string) => {
        const selected = data.find(d => d.id === dusunId);
        if (selected) {
            setSelectedDusun(dusunId);
            setEditValues({
                rt: selected.rt,
                rw: selected.rw,
                kk: selected.kk,
                jiwa: selected.jiwa
            });
        }
    };

    const handleSave = async () => {
        if (!selectedDusun) return;

        try {
            const selectedData = data.find(d => d.id === selectedDusun);
            if (selectedData) {
                await updateDemografisByNama(selectedData.nama, editValues);
                setData(prev => prev.map(d =>
                    d.id === selectedDusun ? { ...d, ...editValues } : d
                ));
                alert('Data berhasil diupdate');
            }
        } catch (error) {
            console.error('Error updating demografis:', error);
            alert('Gagal mengupdate data');
        }
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;

    const selectedData = data.find(d => d.id === selectedDusun);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Demografis</h3>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    Pilih Dusun
                </label>
                <select
                    value={selectedDusun}
                    onChange={(e) => handleDusunSelect(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                >
                    <option value="">-- Pilih Dusun --</option>
                    {data.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.nama}
                        </option>
                    ))}
                </select>
            </div>

            {selectedData && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <h4 className="font-semibold text-gray-700">{selectedData.nama}</h4>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                RT
                            </label>
                            <input
                                type="number"
                                value={editValues.rt || ''}
                                onChange={(e) => setEditValues(prev => ({
                                    ...prev,
                                    rt: parseInt(e.target.value) || 0
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-{#0E4D45}"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                RW
                            </label>
                            <input
                                type="number"
                                value={editValues.rw || ''}
                                onChange={(e) => setEditValues(prev => ({
                                    ...prev,
                                    rw: parseInt(e.target.value) || 0
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                KK
                            </label>
                            <input
                                type="number"
                                value={editValues.kk || ''}
                                onChange={(e) => setEditValues(prev => ({
                                    ...prev,
                                    kk: parseInt(e.target.value) || 0
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Jiwa
                            </label>
                            <input
                                type="number"
                                value={editValues.jiwa || ''}
                                onChange={(e) => setEditValues(prev => ({
                                    ...prev,
                                    jiwa: parseInt(e.target.value) || 0
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full bg-[#0E4D45] text-white py-2 px-4 rounded-md hover:bg-[#0E4D45] focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            )}
        </div>
    );
};

const AgamaEdit: React.FC = () => {
    const [data, setData] = useState<Array<WithId<Agama>>>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const result = await fetchAgama();
            setData(result);
        } catch (error) {
            console.error('Error fetching agama:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: WithId<Agama>) => {
        setEditingId(item.id);
        setEditValues({ [item.id]: item.jumlah });
    };

    const handleSave = async (item: WithId<Agama>) => {
        try {
            const newJumlah = editValues[item.id];
            await updateAgamaJumlahByNama(item.agama, newJumlah);
            setData(prev => prev.map(d => d.id === item.id ? { ...d, jumlah: newJumlah } : d));
            setEditingId(null);
            setEditValues({});
        } catch (error) {
            console.error('Error updating agama:', error);
            alert('Gagal mengupdate data');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValues({});
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Persebaran Agama</h3>
            {data.map((item) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{item.agama}</span>
                        {editingId !== item.id && (
                            <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    {editingId === item.id ? (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Jumlah Jiwa
                                </label>
                                <input
                                    type="number"
                                    value={editValues[item.id] || ''}
                                    onChange={(e) => setEditValues(prev => ({
                                        ...prev,
                                        [item.id]: parseInt(e.target.value) || 0
                                    }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSave(item)}
                                    className="bg-[#0E4D45] text-white px-3 py-1 rounded text-sm hover:bg-[#0E4D45]"
                                >
                                    Simpan
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-600">
                            <span className="text-lg font-semibold">{item.jumlah}</span> jiwa
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Profesi Edit Component
const ProfesiEdit: React.FC = () => {
    const [data, setData] = useState<Array<WithId<Profesi>>>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const result = await fetchProfesi();
            setData(result);
        } catch (error) {
            console.error('Error fetching profesi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: WithId<Profesi>) => {
        setEditingId(item.id);
        setEditValues({ [item.id]: item.jumlah });
    };

    const handleSave = async (item: WithId<Profesi>) => {
        try {
            const newJumlah = editValues[item.id];
            await updateProfesiJumlahByNama(item.nama, newJumlah);
            setData(prev => prev.map(d => d.id === item.id ? { ...d, jumlah: newJumlah } : d));
            setEditingId(null);
            setEditValues({});
        } catch (error) {
            console.error('Error updating profesi:', error);
            alert('Gagal mengupdate data');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValues({});
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Persebaran Profesi</h3>
            {data.map((item) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{item.nama}</span>
                        {editingId !== item.id && (
                            <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    {editingId === item.id ? (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Jumlah
                                </label>
                                <input
                                    type="number"
                                    value={editValues[item.id] || ''}
                                    onChange={(e) => setEditValues(prev => ({
                                        ...prev,
                                        [item.id]: parseInt(e.target.value) || 0
                                    }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSave(item)}
                                    className="bg-[#0E4D45] text-white px-3 py-1 rounded text-sm hover:bg-[#0E4D45]"
                                >
                                    Simpan
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-600">
                            <span className="text-lg font-semibold">{item.jumlah}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Main Component
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
                <div className="mb-6">
                </div>

                <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="mt-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default EditSelayangPandangSidebar;