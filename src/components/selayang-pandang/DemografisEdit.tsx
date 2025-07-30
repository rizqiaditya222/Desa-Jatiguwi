import React, { useState, useEffect } from 'react';
import { fetchDemografis, updateDemografisByNama } from '@/service/selayang-pandang/selayangPandandService';
import { Demografis } from '@/types/demografis';

type WithId<T> = T & { id: string };

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

    const handleInputChange = (field: keyof Demografis, value: number) => {
        setEditValues(prev => ({ ...prev, [field]: value }));
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
                                onChange={(e) => handleInputChange('rt', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                RW
                            </label>
                            <input
                                type="number"
                                value={editValues.rw || ''}
                                onChange={(e) => handleInputChange('rw', parseInt(e.target.value) || 0)}
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
                                onChange={(e) => handleInputChange('kk', parseInt(e.target.value) || 0)}
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
                                onChange={(e) => handleInputChange('jiwa', parseInt(e.target.value) || 0)}
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

export default DemografisEdit;