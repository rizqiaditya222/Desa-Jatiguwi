'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { addGallery, updateGallery, deleteGallery } from '@/service/gallery/galleryService'; // Import gallery services
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApps';
import { Gallery, AddGallery } from '@/types/gallery'; // Import Gallery and AddGallery types

export default function ManageGalleryPage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [galleryList, setGalleryList] = useState<Gallery[]>([]); // State for gallery items
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null); // Track ID of item being edited
  const [editingImageUrl, setEditingImageUrl] = useState<string | null>(null); // Track current image URL for editing

  useEffect(() => {
    fetchGallery(); // Fetch gallery items on component mount
  }, []);

  const fetchGallery = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery')); // Fetch from 'gallery' collection
      const galleryData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Gallery[];
      setGalleryList(galleryData);
    } catch (error: any) {
      console.error('Error fetching gallery items:', error);
      setStatusMessage(`Gagal memuat daftar galeri: ${error.message}`);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    if (!title || !content) {
      setStatusMessage('Judul dan deskripsi harus diisi.');
      return;
    }

    try {
      if (editingGalleryId) {
        // If editing an existing item
        const updateData: Partial<AddGallery & { imageUrl?: string }> = {
          title,
          content,
        };
        if (imageFile) {
          updateData.imageFile = imageFile; // New image provided
        } else if (editingImageUrl) {
          // If no new file is selected, but there was an old image, retain its URL
          updateData.imageUrl = editingImageUrl;
        }

        await updateGallery(editingGalleryId, updateData); // Call updateGallery service
        setStatusMessage('Item galeri berhasil diperbarui!');
        setIsSuccess(true);
        setEditingGalleryId(null); // Exit editing mode
        setEditingImageUrl(null);
      } else {
        // If adding a new item
        if (!imageFile) {
          setStatusMessage('Gambar harus dipilih untuk item galeri baru.');
          return;
        }
        await addGallery({ title, content, imageFile }); // Call addGallery service
        setStatusMessage('Item galeri berhasil ditambahkan!');
        setIsSuccess(true);
      }
      // Clear form fields after successful operation
      setTitle('');
      setContent('');
      setImageFile(null);
      (document.getElementById('image') as HTMLInputElement).value = ''; // Clear file input visually
      fetchGallery(); // Refresh the list of gallery items
    } catch (error: any) {
      setStatusMessage(`Gagal operasi galeri: ${error.message}`);
      setIsSuccess(false);
    }
  };

  const handleEdit = (galleryItem: Gallery) => {
    setEditingGalleryId(galleryItem.id);
    setTitle(galleryItem.title);
    setContent(galleryItem.content);
    setEditingImageUrl(galleryItem.imageUrl);
    setImageFile(null); // Clear image file input when editing
    (document.getElementById('image') as HTMLInputElement).value = ''; // Clear file input visual
    setStatusMessage(''); // Clear previous messages
    setIsSuccess(false);
  };

  const handleDelete = async (galleryId: string, imageUrl: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item galeri ini?')) {
      try {
        await deleteGallery(galleryId, imageUrl); // Call deleteGallery service
        setStatusMessage('Item galeri berhasil dihapus!');
        setIsSuccess(true);
        fetchGallery(); // Refresh the list
        // If the deleted item was being edited, clear the form
        if (editingGalleryId === galleryId) {
          handleCancelEdit();
        }
      } catch (error: any) {
        setStatusMessage(`Gagal menghapus item galeri: ${error.message}`);
        setIsSuccess(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingGalleryId(null);
    setEditingImageUrl(null);
    setTitle('');
    setContent('');
    setImageFile(null);
    (document.getElementById('image') as HTMLInputElement).value = '';
    setStatusMessage('');
    setIsSuccess(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{editingGalleryId ? 'Edit Item Galeri' : 'Tambah Item Galeri Baru'}</h1>
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
          <label htmlFor="content" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Deskripsi:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5} // Reduced rows for description
            cols={50}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
          ></textarea>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gambar Galeri:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {editingGalleryId && editingImageUrl && !imageFile && (
            <p style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
              Gambar saat ini: <a href={editingImageUrl} target="_blank" rel="noopener noreferrer">Lihat Gambar</a>
              <br />
              (Pilih file baru di atas untuk mengubah gambar)
            </p>
          )}
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
            {editingGalleryId ? 'Perbarui Item Galeri' : 'Tambah Item Galeri'}
          </button>
          {editingGalleryId && (
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

      <h2>Daftar Galeri</h2>
      {galleryList.length === 0 ? (
        <p>Tidak ada item galeri yang tersedia.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {galleryList.map((galleryItem) => (
            <li key={galleryItem.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>{galleryItem.title}</h3>
              <p style={{ margin: '5px 0', fontSize: '0.95em', color: '#555' }}>{galleryItem.content}</p>
              {/* Using ClientSideFormattedDate for hydration safety */}
              <ClientSideFormattedDate timestamp={galleryItem.date.seconds * 1000} />
              {galleryItem.imageUrl && (
                <img src={galleryItem.imageUrl} alt={galleryItem.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px', marginTop: '10px' }} />
              )}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => handleEdit(galleryItem)}
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
                  onClick={() => handleDelete(galleryItem.id, galleryItem.imageUrl)}
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