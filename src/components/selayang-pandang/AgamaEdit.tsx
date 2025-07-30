import React, { useState, useEffect } from 'react';
import { fetchAgama, updateAgamaJumlahByNama } from '@/service/selayang-pandang/selayangPandandService';
import { Agama } from '@/types/agama';
import EditItemCard from './EditItemCard';

type WithId<T> = T & { id: string };

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

    const handleValueChange = (itemId: string, value: number) => {
        setEditValues(prev => ({ ...prev, [itemId]: value }));
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Persebaran Agama</h3>
            {data.map((item) => (
                <EditItemCard
                    key={item.id}
                    id={item.id}
                    title={item.agama}
                    value={item.jumlah}
                    unit="jiwa"
                    inputLabel="Jumlah Jiwa"
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

export default AgamaEdit;