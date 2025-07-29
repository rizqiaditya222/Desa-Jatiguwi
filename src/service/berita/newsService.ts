

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
 * Menambahkan berita baru ke Firebase dan mengunggah gambar ke Supabase.
 * @param {AddNewsData} newsData - Objek yang berisi judul, konten, dan file gambar.
 * @returns {Promise<string>} Mengembalikan ID dokumen berita yang baru dibuat.
 */
export async function addNews(newsData: AddNewsData): Promise<string> { 
  const { title, content, imageFile } = newsData;

  try {
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

    const newArticle: Omit<NewsArticle, 'id'> = {
      title: title,
      content: content,
      imageUrl: imageUrl,
      date: Timestamp.now(),
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
 * @param {string} newsId - ID dokumen berita yang akan diperbarui.
 * @param {Partial<AddNewsData & { imageUrl?: string }>} updateData - Objek yang berisi data yang akan diperbarui (judul, konten, atau file gambar baru).
 * Jika imageFile disediakan, gambar lama akan dihapus dan yang baru diunggah.
 * Jika imageUrl disediakan, URL gambar akan langsung diupdate tanpa upload baru.
 * @returns {Promise<void>}
 */
export async function updateNews(newsId: string, updateData: Partial<AddNewsData & { imageUrl?: string }>): Promise<void> {
  try {
    const newsRef = doc(db, 'berita', newsId);
    const updatedFields: Partial<NewsArticle> = {};

    
    const docSnap = await getDoc(newsRef);
    if (!docSnap.exists()) {
      throw new Error(`Berita dengan ID ${newsId} tidak ditemukan.`);
    }
    const oldNewsData = docSnap.data() as NewsArticle; 
    const oldImageUrl = oldNewsData.imageUrl; 

    if (updateData.title) {
      updatedFields.title = updateData.title;
    }
    if (updateData.content) {
      updatedFields.content = updateData.content;
    }

    if (updateData.imageFile) {
      
      if (oldImageUrl) {
        
        const oldFileNameInStorage = oldImageUrl.split('/').slice(-2).join('/'); 
        const { error: deleteOldError } = await supabase.storage
          .from('desajatiguwi')
          .remove([oldFileNameInStorage]);

        if (deleteOldError) {
          console.warn('Peringatan: Gagal menghapus gambar lama dari Supabase:', deleteOldError.message);
          
        }
      }

      
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

    } else if (updateData.imageUrl) {
      
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
 * @param {string} newsId - ID dokumen berita yang akan dihapus.
 * @param {string} imageUrl - URL gambar yang terkait dengan berita. Diperlukan untuk menghapus gambar dari Supabase.
 * @returns {Promise<void>}
 */
export async function deleteNews(newsId: string, imageUrl: string): Promise<void> {
  try {
    
    const newsRef = doc(db, 'berita', newsId);
    await deleteDoc(newsRef);

    
    
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