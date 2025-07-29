import { db } from '@/lib/firebase/clientApps';
import { supabase } from '@/lib/supabase/supabaseConfig';
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDoc, 
} from 'firebase/firestore';
import { AddNewsData, NewsArticle } from '@/types/berita';

/**
 * Generates a URL-friendly slug from a given string.
 * Sama seperti di pengumuman.
 */
function generateSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Menambahkan berita baru ke Firebase dan mengunggah gambar ke Supabase.
 * @param {AddNewsData} newsData - Objek yang berisi judul, konten, dan file gambar.
 * @returns {Promise<string>} Mengembalikan ID dokumen berita yang baru dibuat.
 */
export async function addNews(newsData: AddNewsData): Promise<string> { 
  const { title, content, imageFile } = newsData;

  try {
    // Upload gambar ke Supabase
    const folderName = 'berita-images';
    const fileName = `${folderName}/${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('desajatiguwi')
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error('Error uploading image to Supabase:', uploadError);
      throw new Error(`Gagal mengunggah gambar: ${uploadError.message}`);
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/desajatiguwi/${fileName}`;

    // Generate slug dari title (seperti pengumuman)
    const slug = generateSlug(title);

    const newArticle: Omit<NewsArticle, 'id'> = {
      title: title,
      content: content,
      imageUrl: imageUrl,
      date: Timestamp.now(),
      slug: slug,
    };

    const docRef = await addDoc(collection(db, 'berita'), newArticle);

    console.log('Berita berhasil ditambahkan dengan ID:', docRef.id);
    return docRef.id; 
  } catch (error: any) {
    console.error('Error adding news:', error);
    throw error;
  }
}

/**
 * Memperbarui berita yang sudah ada di Firebase dan/atau mengganti gambar di Supabase.
 * - Jika title diubah, slug akan di-generate ulang dari title baru (seperti pengumuman).
 * @param {string} newsId
 * @param {Partial<AddNewsData & { imageUrl?: string }>} updateData
 */
export async function updateNews(
  newsId: string,
  updateData: Partial<AddNewsData & { imageUrl?: string }>
): Promise<void> {
  try {
    const newsRef = doc(db, 'berita', newsId);
    const updatedFields: Partial<NewsArticle> = {};

    // Ambil data lama untuk mendapatkan imageUrl lama
    const docSnap = await getDoc(newsRef);
    if (!docSnap.exists()) {
      throw new Error(`Berita dengan ID ${newsId} tidak ditemukan.`);
    }
    const oldNewsData = docSnap.data() as NewsArticle; 
    const oldImageUrl = oldNewsData.imageUrl; 

    // Update title & content
    if (updateData.title) {
      updatedFields.title = updateData.title;
      // Generate slug baru jika title berubah
      updatedFields.slug = generateSlug(updateData.title);
    }
    if (updateData.content) {
      updatedFields.content = updateData.content;
    }

    // Ganti gambar jika imageFile diberikan
    if (updateData.imageFile) {
      // Hapus gambar lama dari Supabase (jika ada)
      if (oldImageUrl) {
        const urlParts = oldImageUrl.split('/public/desajatiguwi/');
        if (urlParts.length >= 2) {
          const oldFileNameInStorage = urlParts[1]; 
          const { error: deleteOldError } = await supabase.storage
            .from('desajatiguwi')
            .remove([oldFileNameInStorage]);
          if (deleteOldError) {
            console.warn('Peringatan: Gagal menghapus gambar lama dari Supabase:', deleteOldError.message);
          }
        } else {
          console.warn('Peringatan: URL gambar lama tidak sesuai pola public/desajatiguwi/. Lewati penghapusan.');
        }
      }

      // Upload gambar baru
      const folderName = 'berita-images';
      const fileName = `${folderName}/${Date.now()}-${updateData.imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('desajatiguwi')
        .upload(fileName, updateData.imageFile);

      if (uploadError) {
        console.error('Error uploading new image to Supabase:', uploadError);
        throw new Error(`Gagal mengunggah gambar baru: ${uploadError.message}`);
      }
      updatedFields.imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/desajatiguwi/${fileName}`;
    }
    // Atau jika langsung diberikan imageUrl baru (tanpa upload)
    else if (updateData.imageUrl) {
      updatedFields.imageUrl = updateData.imageUrl;
    }

    await updateDoc(newsRef, updatedFields);
    console.log(`Berita dengan ID ${newsId} berhasil diperbarui!`);
  } catch (error: any) {
    console.error(`Error updating news with ID ${newsId}:`, error);
    throw error;
  }
}

/**
 * Menghapus berita dari Firebase dan gambar terkait dari Supabase.
 * @param {string} newsId
 * @param {string} imageUrl
 */
export async function deleteNews(newsId: string, imageUrl: string): Promise<void> {
  try {
    // Hapus dokumen berita
    const newsRef = doc(db, 'berita', newsId);
    await deleteDoc(newsRef);

    // Hapus file gambar di Supabase (berdasarkan pola URL public)
    const urlParts = imageUrl.split('/public/desajatiguwi/'); 
    if (urlParts.length < 2) {
      console.warn(`Peringatan: URL gambar tidak valid untuk dihapus dari Supabase: ${imageUrl}`);
    } else {
      const fileNameInStorage = urlParts[1]; 
      const { error: deleteError } = await supabase.storage
        .from('desajatiguwi')
        .remove([fileNameInStorage]); 

      if (deleteError) {
        console.error('Error deleting image from Supabase:', deleteError);
      }
    }

    console.log(`Berita dengan ID ${newsId} dan gambarnya berhasil dihapus!`);
  } catch (error: any) {
    console.error(`Error deleting news with ID ${newsId}:`, error);
    throw error;
  }
}
