'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { AddPengumuman, updatePengumuman, deletePengumuman } from '@/service/pengumuman/pengumumanService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApps';
import { PengumumanArticle } from '@/types/pengumuman';

export default function ManagePengumumanPage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [pengumumanList, setPengumumanList] = useState<PengumumanArticle[]>([]);
  const [editingPengumumanId, setEditingPengumumanId] = useState<string | null>(null);

  useEffect(() => {
    fetchPengumuman();
  }, []);

  const fetchPengumuman = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pengumuman'));
      const pengumumanData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PengumumanArticle[];
      setPengumumanList(pengumumanData);
    } catch (error: any) {
      console.error('Error fetching pengumuman:', error);
      setStatusMessage(`Gagal memuat daftar pengumuman: ${error.message}`);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    if (!title || !content) {
      setStatusMessage('Judul dan konten pengumuman harus diisi.');
      return;
    }

    try {
      if (editingPengumumanId) {
        // If an ID exists, we are updating an existing announcement
        await updatePengumuman(editingPengumumanId, { title, content });
        setStatusMessage('Pengumuman berhasil diperbarui!');
        setIsSuccess(true);
        setEditingPengumumanId(null); // Exit editing mode
      } else {
        // Otherwise, add a new announcement
        await AddPengumuman({ title, content });
        setStatusMessage('Pengumuman berhasil ditambahkan!');
        setIsSuccess(true);
      }
      // Clear form and refresh list after successful operation
      setTitle('');
      setContent('');
      fetchPengumuman();
    } catch (error: any) {
      setStatusMessage(`Gagal menyimpan pengumuman: ${error.message}`);
      setIsSuccess(false);
    }
  };

  const handleEdit = (pengumuman: PengumumanArticle) => {
    setEditingPengumumanId(pengumuman.id);
    setTitle(pengumuman.title);
    setContent(pengumuman.content);
    setStatusMessage(''); // Clear any previous status messages
    setIsSuccess(false);
  };

  const handleDelete = async (pengumumanId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      try {
        await deletePengumuman(pengumumanId);
        setStatusMessage('Pengumuman berhasil dihapus!');
        setIsSuccess(true);
        fetchPengumuman(); // Refresh the list
        // If the deleted item was being edited, clear the form
        if (editingPengumumanId === pengumumanId) {
          handleCancelEdit();
        }
      } catch (error: any) {
        setStatusMessage(`Gagal menghapus pengumuman: ${error.message}`);
        setIsSuccess(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingPengumumanId(null);
    setTitle('');
    setContent('');
    setStatusMessage('');
    setIsSuccess(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{editingPengumumanId ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Judul:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Isi Pengumuman:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            cols={50}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1em',
              flexGrow: 1
            }}
          >
            {editingPengumumanId ? 'Perbarui Pengumuman' : 'Tambah Pengumuman'}
          </button>
          {editingPengumumanId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em',
                flexGrow: 1
              }}
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>

      {statusMessage && (
        <p style={{ marginTop: '20px', padding: '10px', borderRadius: '4px', backgroundColor: isSuccess ? '#d4edda' : '#f8d7da', color: isSuccess ? '#155724' : '#721c24', border: isSuccess ? '1px solid #c3e6cb' : '1px solid #f5c6cb' }}>
          {statusMessage}
        </p>
      )}

      ---

      <h2>Daftar Pengumuman</h2>
      {pengumumanList.length === 0 ? (
        <p>Tidak ada pengumuman yang tersedia.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pengumumanList.map((pengumuman) => (
            <li key={pengumuman.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>{pengumuman.title}</h3>
              <p style={{ margin: '5px 0', color: '#555' }}>{pengumuman.content}</p>
              {/* Using a client-side component for date formatting to prevent hydration errors */}
              <ClientSideFormattedDate timestamp={pengumuman.date.seconds * 1000} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => handleEdit(pengumuman)}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#ffc107',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9em'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pengumuman.id)}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9em'
                  }}
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Helper component to handle client-side date formatting and prevent hydration errors
function ClientSideFormattedDate({ timestamp }: { timestamp: number }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This code only runs on the client after hydration
    setFormattedDate(new Date(timestamp).toLocaleDateString('id-ID'));
  }, [timestamp]); // Recalculate if timestamp changes

  // Render an empty string on the server, and the actual date once hydrated on the client.
  return <p style={{ fontSize: '0.9em', color: '#666' }}>{formattedDate || ''}</p>;
}