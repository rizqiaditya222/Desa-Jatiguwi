import React from 'react';

interface EditItemCardProps {
    id: string;
    title: string;
    value: number;
    unit?: string;
    isEditing: boolean;
    editValue: number;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onValueChange: (value: number) => void;
    inputLabel?: string;
}

const EditItemCard: React.FC<EditItemCardProps> = ({
    id,
    title,
    value,
    unit = '',
    isEditing,
    editValue,
    onEdit,
    onSave,
    onCancel,
    onValueChange,
    inputLabel = 'Nilai'
}) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">{title}</span>
                {!isEditing && (
                    <button
                        onClick={onEdit}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            {inputLabel}
                        </label>
                        <input
                            type="number"
                            value={editValue || ''}
                            onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onSave}
                            className="bg-[#0E4D45] text-white px-3 py-1 rounded text-sm hover:bg-[#0E4D45]"
                        >
                            Simpan
                        </button>
                        <button
                            onClick={onCancel}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-gray-600">
                    <span className="text-lg font-semibold">{value}</span> {unit}
                </div>
            )}
        </div>
    );
};

export default EditItemCard;