import React, { useState, useEffect } from 'react';
import { fetchLahan, updateLahanLuasByNama } from '@/service/selayang-pandang/selayangPandandService';
import { Lahan } from '@/types/lahan';
import EditItemCard from './EditItemCard';

type WithId<T> = T & { id: string };

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

    const handleValueChange = (itemId: string, value: number) => {
        setEditValues(prev => ({ ...prev, [itemId]: value }));
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Penggunaan Lahan</h3>
            {data.map((item) => (
                <EditItemCard
                    key={item.id}
                    id={item.id}
                    title={item.nama}
                    value={item.luas}
                    unit="Ha"
                    inputLabel="Luas (Ha)"
                    isEditing={editingId === item.id}
                    editValue={editValues[item.id] || 0}
                    onEdit={() => handleEdit(item)}
                    onSave={() => handleSave(item)}
                    onCancel={handleCancel}
                    onValueChange={(value) => handleValueChange(item.id, value)}
                />
            ))}
        </div>
    );
};

export default LahanEdit;