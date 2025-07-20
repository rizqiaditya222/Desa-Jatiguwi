'use client';

import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import app from '@/lib/firebase/clientApps';

const db = getFirestore(app);

const DATA_PER_PAGE = 10;

interface PendudukData {
  id?: string;
  AGAMA: string;
  AGAMA_KET: string;
  ALAMAT: string;
  DUSUN: string;
  GOL_DRH: string;
  ID: string;
  JENIS_KLMIN: string;
  JENIS_KLMIN_KET: string;
  JENIS_PKRJN: string;
  JENIS_PKRJN_KET: string;
  KODE_POS: string;
  NAMA_KAB: string;
  NAMA_KEC: string;
  NAMA_KEL: string;
  NAMA_LGKP: string;
  NAMA_LGKP_AYAH: string;
  NAMA_LGKP_IBU: string;
  NAMA_PROP: string;
  NIK: string;
  NO_KAB: string;
  NO_KEC: string;
  NO_KEL: string;
  NO_KK: string;
  NO_PROP: string;
  NO_RT: string;
  NO_RW: string;
  PDDK_AKH: string;
  PENDIDIKAN_AKH_KET: string;
  STAT_HBKEL: string;
  STAT_HBKEL_1: string;
  STAT_KWN_KET: string;
  TELP: string;
  TGL_KWN: string;
}

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

  const emptyFormData: Partial<PendudukData> = {
    AGAMA: '',
    AGAMA_KET: '',
    ALAMAT: '',
    DUSUN: '',
    GOL_DRH: '',
    ID: '',
    JENIS_KLMIN: '',
    JENIS_KLMIN_KET: '',
    JENIS_PKRJN: '',
    JENIS_PKRJN_KET: '',
    KODE_POS: '',
    NAMA_KAB: '',
    NAMA_KEC: '',
    NAMA_KEL: '',
    NAMA_LGKP: '',
    NAMA_LGKP_AYAH: '',
    NAMA_LGKP_IBU: '',
    NAMA_PROP: '',
    NIK: '',
    NO_KAB: '',
    NO_KEC: '',
    NO_KEL: '',
    NO_KK: '',
    NO_PROP: '',
    NO_RT: '',
    NO_RW: '',
    PDDK_AKH: '',
    PENDIDIKAN_AKH_KET: '',
    STAT_HBKEL: '',
    STAT_HBKEL_1: '',
    STAT_KWN_KET: '',
    TELP: '',
    TGL_KWN: '',
  };
const fetchData = async (reset = false) => {
  setLoading(true);
  setError(null);

  try {
    let baseQuery = query(
      collection(db, 'Penduduk'),
      orderBy(orderField, orderDirection)
    );

    // Tambahkan pencarian jika ada
    if (searchTerm) {
      baseQuery = query(
        collection(db, 'Penduduk'),
        where(searchField, '>=', searchTerm),
        where(searchField, '<=', searchTerm + '\uf8ff'),
        orderBy(searchField, orderDirection)
      );
    }

    // Tambahkan pagination
    if (reset) {
      baseQuery = query(baseQuery, limit(DATA_PER_PAGE));
    } else if (lastDoc) {
      baseQuery = query(baseQuery, startAfter(lastDoc), limit(DATA_PER_PAGE));
    }

    const snapshot = await getDocs(baseQuery);
    const docs = snapshot.docs;

    const fetchedData = docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        NIK: String(data.NIK),
        NO_KK: String(data.NO_KK),
      } as PendudukData;
    });

    if (reset) {
      setData(fetchedData);
    } else {
      setData((prev) => [...prev, ...fetchedData]);
    }

    setLastDoc(docs[docs.length - 1] || null);
    setIsLastPage(docs.length < DATA_PER_PAGE);
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
    fetchData(true);
  }, [orderField, orderDirection, searchTerm, searchField]);

  const handleNextPage = () => {
    if (!isLastPage && !loading) {
      fetchData();
      setPage((prev) => prev + 1);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setData([]);
    setLastDoc(null);
    setPage(1);
    fetchData(true);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setData([]);
    setLastDoc(null);
    setPage(1);
    fetchData(true);
  };

  const handleRowClick = (person: PendudukData) => {
    setSelectedPerson(person);
    setShowDetail(true);
  };

  const handleAdd = () => {
    setFormMode('add');
    setFormData(emptyFormData);
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
          await deleteDoc(doc(db, 'Penduduk', person.id));
          setData(prev => prev.filter(p => p.id !== person.id));
          setShowDetail(false);
          alert('Data berhasil dihapus');
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
        const docRef = await addDoc(collection(db, 'Penduduk'), formData);
        const newData = { id: docRef.id, ...formData } as PendudukData;
        setData(prev => [newData, ...prev]);
        alert('Data berhasil ditambahkan');
      } else {
        if (formData.id) {
          await updateDoc(doc(db, 'Penduduk', formData.id), formData);
          setData(prev => prev.map(p => p.id === formData.id ? { ...formData } as PendudukData : p));
          alert('Data berhasil diupdate');
        }
      }
      setShowForm(false);
      setFormData(emptyFormData);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
              {Object.keys(emptyFormData).map((field) => (
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