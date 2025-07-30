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
 * Helper function untuk menghapus file dari Supabase storage
 * @param imageUrl - URL gambar yang akan dihapus
 */
async function deleteImageFromSupabase(imageUrl: string): Promise<void> {
  if (!imageUrl) {
    console.warn('URL gambar kosong, tidak ada yang dihapus');
    return;
  }

  try {
    // Parse URL untuk mendapatkan file path
    const url = new URL(imageUrl);
    const pathSegments = url.pathname.split('/');
    
    // Cari index 'public' dalam path
    const publicIndex = pathSegments.findIndex(segment => segment === 'public');
    
    if (publicIndex === -1 || publicIndex + 2 >= pathSegments.length) {
      console.warn(`URL gambar tidak sesuai format yang diharapkan: ${imageUrl}`);
      return;
    }

    // Bucket name adalah segment setelah 'public'
    const bucketName = pathSegments[publicIndex + 1];
    // File path adalah semua segment setelah bucket name
    const filePath = pathSegments.slice(publicIndex + 2).join('/');

    console.log(`Menghapus file: ${filePath} dari bucket: ${bucketName}`);

    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (deleteError) {
      console.error('Error deleting image from Supabase:', deleteError);
      throw new Error(`Gagal menghapus gambar: ${deleteError.message}`);
    }

    console.log(`Gambar berhasil dihapus: ${filePath}`);
  } catch (error: any) {
    console.error('Error parsing URL atau menghapus gambar:', error);
    throw error;
  }
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
      // Upload gambar baru terlebih dahulu
      const folderName = 'berita-images';
      const fileName = `${folderName}/${Date.now()}-${updateData.imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('desajatiguwi')
        .upload(fileName, updateData.imageFile);

      if (uploadError) {
        console.error('Error uploading new image to Supabase:', uploadError);
        throw new Error(`Gagal mengunggah gambar baru: ${uploadError.message}`);
      }

      const newImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/desajatiguwi/${fileName}`;
      updatedFields.imageUrl = newImageUrl;

      // Update dokumen Firebase terlebih dahulu
      await updateDoc(newsRef, updatedFields);

      // Hapus gambar lama setelah berhasil update (untuk menghindari kehilangan data jika update gagal)
      if (oldImageUrl) {
        try {
          await deleteImageFromSupabase(oldImageUrl);
        } catch (deleteError) {
          console.warn('Peringatan: Gagal menghapus gambar lama, tapi update data berhasil:', deleteError);
        }
      }
    }
    // Atau jika langsung diberikan imageUrl baru (tanpa upload)
    else if (updateData.imageUrl) {
      updatedFields.imageUrl = updateData.imageUrl;
      await updateDoc(newsRef, updatedFields);
    }
    // Jika hanya update title/content tanpa gambar
    else if (Object.keys(updatedFields).length > 0) {
      await updateDoc(newsRef, updatedFields);
    }

    console.log(`Berita dengan ID ${newsId} berhasil diperbarui!`);
  } catch (error: any) {
    console.error(`Error updating news with ID ${newsId}:`, error);
    throw error;
  }
}

/**
 * Menghapus berita dari Firebase dan gambar terkait dari Supabase.
 * @param {string} newsId
 * @param {string} imageUrl - Opsional, jika tidak diberikan akan diambil dari document
 */
export async function deleteNews(newsId: string, imageUrl?: string): Promise<void> {
  try {
    const newsRef = doc(db, 'berita', newsId);
    
    // Jika imageUrl tidak diberikan, ambil dari document
    let imageUrlToDelete = imageUrl;
    if (!imageUrlToDelete) {
      const docSnap = await getDoc(newsRef);
      if (docSnap.exists()) {
        const newsData = docSnap.data() as NewsArticle;
        imageUrlToDelete = newsData.imageUrl;
      }
    }

    // Hapus dokumen berita terlebih dahulu
    await deleteDoc(newsRef);
    console.log(`Dokumen berita dengan ID ${newsId} berhasil dihapus dari Firebase`);

    // Hapus gambar dari Supabase jika ada
    if (imageUrlToDelete) {
      try {
        await deleteImageFromSupabase(imageUrlToDelete);
        console.log(`Gambar berita berhasil dihapus dari Supabase`);
      } catch (deleteError) {
        console.warn('Peringatan: Dokumen sudah terhapus, tapi gagal menghapus gambar dari Supabase:', deleteError);
      }
    } else {
      console.warn('Tidak ada URL gambar untuk dihapus');
    }

    console.log(`Berita dengan ID ${newsId} berhasil dihapus sepenuhnya!`);
  } catch (error: any) {
    console.error(`Error deleting news with ID ${newsId}:`, error);
    throw error;
  }
}