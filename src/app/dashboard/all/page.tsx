'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { QueryDocumentSnapshot } from 'firebase/firestore';

import app from '@/lib/firebase/clientApps';
import { PendudukData } from '@/types/penduduk';
import {
  fetchPendudukData,
  addPenduduk,
  updatePenduduk,
  deletePenduduk,
  emptyPendudukFormData,
} from '@/service/penduduk/pendudukService'

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DATA_PER_PAGE = 10; 

export default function AllPendudukPage() {
  const [data, setData] = useState<PendudukData[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [orderField, setOrderField] = useState<keyof PendudukData>('NIK');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<keyof PendudukData>('NAMA_LGKP');

  // Modal states
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PendudukData | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  // Form data
  const [formData, setFormData] = useState<Partial<PendudukData>>({});

  const router = useRouter();
  const auth = getAuth(app);

  // --- Authentication Redirect Logic ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/auth/login');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const loadData = async (reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const { data: fetchedData, lastVisible, isLastPage: newIsLastPage } = await fetchPendudukData({
        limitNumber: DATA_PER_PAGE,
        lastDoc: reset ? null : lastDoc,
        orderField,
        orderDirection,
        searchTerm,
        searchField,
      });

      if (reset) {
        setData(fetchedData);
      } else {
        setData((prev) => [...prev, ...fetchedData]);
      }

      setLastDoc(lastVisible);
      setIsLastPage(newIsLastPage);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Gagal mengambil data dari Firestore');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    setLastDoc(null);
    setPage(1);
    loadData(true);
  }, [orderField, orderDirection, searchTerm, searchField]);

  const handleNextPage = () => {
    if (!isLastPage && !loading) {
      loadData();
      setPage((prev) => prev + 1);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setData([]);
    setLastDoc(null);
    setPage(1);
    loadData(true);
  };

  const clearSearch = () => {
    setSearchTerm('');
    // useEffect will re-trigger loadData(true) because searchTerm changes
  };

  const handleRowClick = (person: PendudukData) => {
    setSelectedPerson(person);
    setShowDetail(true);
  };

  const handleAdd = () => {
    setFormMode('add');
    setFormData(emptyPendudukFormData);
    setShowForm(true);
  };

  const handleEdit = (person: PendudukData) => {
    setFormMode('edit');
    setFormData(person);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleDelete = async (person: PendudukData) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        if (person.id) {
          await deletePenduduk(person.id);
          setData(prev => prev.filter(p => p.id !== person.id));
          setShowDetail(false);
          alert('Data berhasil dihapus');
          // Re-fetch data to ensure pagination is correct after deletion
          loadData(true);
        }
      } catch (err) {
        console.error('Error deleting document:', err);
        alert('Gagal menghapus data');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formMode === 'add') {
        const newData = await addPenduduk(formData);
        setData(prev => [newData, ...prev]); // Add new data to the beginning for immediate display
        alert('Data berhasil ditambahkan');
      } else {
        if (formData.id) {
          await updatePenduduk(formData.id, formData);
          setData(prev => prev.map(p => p.id === formData.id ? { ...formData } as PendudukData : p));
          alert('Data berhasil diupdate');
        }
      }
      setShowForm(false);
      setFormData(emptyPendudukFormData);
      // Re-fetch data to ensure correct sorting/pagination after add/edit
      loadData(true);
    } catch (err) {
      console.error('Error saving document:', err);
      alert('Gagal menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof PendudukData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExportToExcel = async () => {
    setLoading(true);
    try {
      console.log('Starting Excel export...');

      // Fetch all data for export, ignoring current pagination
      const { data: allFetchedData } = await fetchPendudukData({
        limitNumber: Infinity, // Fetch all data
        orderField,
        orderDirection,
        searchTerm,
        searchField,
      });

      console.log(`Found ${allFetchedData.length} documents for export`);

      if (allFetchedData.length === 0) {
        alert('Tidak ada data untuk diekspor.');
        setLoading(false);
        return;
      }

      // Prepare data for Excel (remove 'id' field)
      const dataForExport = allFetchedData.map(person => {
        const { id, ...rest } = person;
        return rest;
      });

      console.log('Creating Excel worksheet...');

      // Create worksheet with proper headers
      const worksheet = XLSX.utils.json_to_sheet(dataForExport, {
        header: Object.keys(dataForExport[0] || {}), // Ensure consistent column order
      });

      const colWidths = Object.keys(dataForExport[0] || {}).map(() => ({ wch: 15 }));
      worksheet['!cols'] = colWidths;

      console.log('Creating workbook...');
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Penduduk');

      console.log('Generating Excel file...');

      try {
        const fileName = `Data_Penduduk_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        alert('Data berhasil diekspor ke Excel!');
      } catch (writeFileError) {
        console.log('writeFile failed, trying alternative method...', writeFileError);

        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
          bookSST: false, 
        });

        const dataBlob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        const fileName = `Data_Penduduk_${new Date().toISOString().split('T')[0]}.xlsx`;
        saveAs(dataBlob, fileName);
        alert('Data berhasil diekspor ke Excel!');
      }

    } catch (err) {
      console.error('Detailed error during Excel export:', err);

      // Provide more specific error messages
      if (err instanceof Error) {
        if (err.message.includes('quota')) {
          alert('Gagal mengekspor: Kuota Firestore terlampaui. Coba lagi nanti.');
        } else if (err.message.includes('permission')) {
          alert('Gagal mengekspor: Tidak memiliki izin akses data.');
        } else if (err.message.includes('network')) {
          alert('Gagal mengekspor: Masalah koneksi internet.');
        } else {
          alert(`Gagal mengekspor data ke Excel: ${err.message}`);
        }
      } else {
        alert('Gagal mengekspor data ke Excel. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };


  // Daftar field yang bisa digunakan untuk sorting dan pencarian
  const availableFields: (keyof PendudukData)[] = [
    'NIK', 'NAMA_LGKP', 'ALAMAT', 'DUSUN', 'AGAMA_KET', 'JENIS_KLMIN_KET',
    'JENIS_PKRJN_KET', 'PENDIDIKAN_AKH_KET', 'STAT_KWN_KET', 'NAMA_KAB',
    'NAMA_KEC', 'NAMA_KEL', 'NAMA_PROP', 'NO_KK', 'TELP'
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#0E4D45]">Data Penduduk</h1>

        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as keyof PendudukData)}
              className="border rounded px-2 py-1"
            >
              {availableFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari data..."
              className="border rounded px-3 py-1"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Cari
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Clear
              </button>
            )}
          </form>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Urutkan:</label>
            <select
              value={orderField}
              onChange={(e) => setOrderField(e.target.value as keyof PendudukData)}
              className="border rounded px-2 py-1"
            >
              {availableFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
            <select
              value={orderDirection}
              onChange={(e) => setOrderDirection(e.target.value as 'asc' | 'desc')}
              className="border rounded px-2 py-1"
            >
              <option value="asc">Naik (A-Z)</option>
              <option value="desc">Turun (Z-A)</option>
            </select>
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Tambah Data
          </button>

          {/* Export to Excel button */}
          <button
            onClick={handleExportToExcel}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Mengekspor...' : 'Export ke Excel'}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Data table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#0E4D45] text-white">
            <tr>
              <th className="px-3 py-2 text-left">NIK</th>
              <th className="px-3 py-2 text-left">Nama</th>
              <th className="px-3 py-2 text-left">Alamat</th>
              <th className="px-3 py-2 text-left">Dusun</th>
              <th className="px-3 py-2 text-left">JK</th>
              <th className="px-3 py-2 text-left">Agama</th>
              <th className="px-3 py-2 text-left">Pekerjaan</th>
              <th className="px-3 py-2 text-left">No KK</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person, index) => (
              <tr
                key={`${person.NIK}-${index}`}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(person)}
              >
                <td className="px-3 py-2">{person.NIK}</td>
                <td className="px-3 py-2">{person.NAMA_LGKP}</td>
                <td className="px-3 py-2">{person.ALAMAT}</td>
                <td className="px-3 py-2">{person.DUSUN}</td>
                <td className="px-3 py-2">{person.JENIS_KLMIN_KET}</td>
                <td className="px-3 py-2">{person.AGAMA_KET}</td>
                <td className="px-3 py-2">{person.JENIS_PKRJN_KET}</td>
                <td className="px-3 py-2">{person.NO_KK}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0E4D45]"></div>
          <p className="mt-2 text-gray-600">Memuat data...</p>
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Halaman {page} | Total data: {data.length} {isLastPage ? '(semua data)' : '(memuat...)'}
        </p>
        <button
          onClick={handleNextPage}
          disabled={isLastPage || loading}
          className="px-4 py-2 bg-[#0E4D45] text-white rounded hover:bg-[#106157] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Memuat...' : 'Halaman Selanjutnya'}
        </button>
      </div>

      {/* Detail Modal */}
      {showDetail && selectedPerson && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#0E4D45]">Detail Data Penduduk</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedPerson).map(([key, value]) => (
                key !== 'id' && (
                  <div key={key} className="border-b pb-2">
                    <label className="font-semibold text-gray-700">{key}:</label>
                    <p className="text-gray-900">{value || '-'}</p>
                  </div>
                )
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => handleEdit(selectedPerson)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(selectedPerson)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Hapus
              </button>
              <button
                onClick={() => setShowDetail(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#0E4D45]">
                {formMode === 'add' ? 'Tambah Data Penduduk' : 'Edit Data Penduduk'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(emptyPendudukFormData).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={formData[field as keyof PendudukData] || ''}
                    onChange={(e) => handleInputChange(field as keyof PendudukData, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required={field === 'NIK' || field === 'NAMA_LGKP'}
                  />
                </div>
              ))}

              <div className="md:col-span-2 flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#0E4D45] text-white rounded hover:bg-[#106157] disabled:bg-gray-400"
                >
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}