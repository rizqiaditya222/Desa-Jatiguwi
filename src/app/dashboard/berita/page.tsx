'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { addNews, updateNews, deleteNews } from '@/service/berita/newsService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApps';
import { NewsArticle } from '@/types/berita';

export default function ManageNewsPage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [editingImageUrl, setEditingImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'berita'));
      const newsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];
      setNewsList(newsData);
    } catch (error: any) {
      console.error('Error fetching news:', error);
      setStatusMessage(`Gagal memuat daftar berita: ${error.message}`);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    if (!title || !content) {
      setStatusMessage('Judul dan konten harus diisi.');
      return;
    }

    try {
      if (editingNewsId) {
        const updateData: Partial<NewsArticle & { imageFile?: File }> = {
          title,
          content,
        };
        if (imageFile) {
          updateData.imageFile = imageFile;
        } else if (editingImageUrl) {
          // If no new file is selected, but there was an old image, retain it
          updateData.imageUrl = editingImageUrl;
        }

        await updateNews(editingNewsId, updateData);
        setStatusMessage('Berita berhasil diperbarui!');
        setIsSuccess(true);
        setEditingNewsId(null);
        setEditingImageUrl(null);
      } else {
        // Add new news
        if (!imageFile) {
          setStatusMessage('Gambar harus dipilih untuk berita baru.');
          return;
        }
        await addNews({ title, content, imageFile });
        setStatusMessage('Berita berhasil ditambahkan!');
        setIsSuccess(true);
      }
      setTitle('');
      setContent('');
      setImageFile(null);
      (document.getElementById('image') as HTMLInputElement).value = '';
      fetchNews(); // Refresh the list
    } catch (error: any) {
      setStatusMessage(`Gagal operasi berita: ${error.message}`);
      setIsSuccess(false);
    }
  };

  const handleEdit = (news: NewsArticle) => {
    setEditingNewsId(news.id);
    setTitle(news.title);
    setContent(news.content);
    setEditingImageUrl(news.imageUrl);
    setImageFile(null); // Clear image file input when editing
    (document.getElementById('image') as HTMLInputElement).value = ''; // Clear file input visual
  };

  const handleDelete = async (newsId: string, imageUrl: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await deleteNews(newsId, imageUrl);
        setStatusMessage('Berita berhasil dihapus!');
        setIsSuccess(true);
        fetchNews(); // Refresh the list
      } catch (error: any) {
        setStatusMessage(`Gagal menghapus berita: ${error.message}`);
        setIsSuccess(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingNewsId(null);
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
      <h1>{editingNewsId ? 'Edit Berita' : 'Tambah Berita Baru'}</h1>
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
          <label htmlFor="content" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Isi Konten:</label>
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

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gambar Berita:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {editingNewsId && editingImageUrl && !imageFile && (
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
            {editingNewsId ? 'Perbarui Berita' : 'Tambah Berita'}
          </button>
          {editingNewsId && (
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

      <hr style={{ margin: '40px 0', borderTop: '1px solid #eee' }} />

      <h2>Daftar Berita</h2>
      {newsList.length === 0 ? (
        <p>Tidak ada berita yang tersedia.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {newsList.map((news) => (
            <li key={news.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>{news.title}</h3>
              {/* --- CHANGE MADE HERE --- */}
              <ClientSideFormattedDate timestamp={news.date.seconds * 1000} />
              {/* --- END CHANGE --- */}
              {news.imageUrl && (
                <img src={news.imageUrl} alt={news.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px', marginTop: '10px' }} />
              )}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => handleEdit(news)}
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
                  onClick={() => handleDelete(news.id, news.imageUrl)}
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

// New helper component for client-side date formatting
function ClientSideFormattedDate({ timestamp }: { timestamp: number }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This code only runs on the client after hydration
    setFormattedDate(new Date(timestamp).toLocaleDateString('id-ID'));
  }, [timestamp]); // Recalculate if timestamp changes

  // Render an empty string on the server, and the actual date once hydrated on the client.
  return <p style={{ fontSize: '0.9em', color: '#666' }}>{formattedDate || ''}</p>;
}