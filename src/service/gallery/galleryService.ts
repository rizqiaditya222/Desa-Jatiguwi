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
import { AddGallery, Gallery } from '@/types/gallery'; 

/**
 * @param {AddGallery} galleryData - Objek yang berisi judul, konten, dan file gambar.
 * @returns {Promise<string>} Mengembalikan ID dokumen galeri yang baru dibuat.
 */
export async function addGallery(galleryData: AddGallery): Promise<string> {
  const { title, content, imageFile } = galleryData;

  try {
    const folderName = 'gallery-images'; 
    const fileName = `${folderName}/${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('desajatiguwi') 
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error('Error uploading image to Supabase:', uploadError);
      throw new Error(`Gagal mengunggah gambar galeri: ${uploadError.message}`);
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/desajatiguwi/${fileName}`;

    const newGalleryItem: Omit<Gallery, 'id'> = {
      title: title,
      content: content,
      imageUrl: imageUrl,
      date: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'gallery'), newGalleryItem); 

    console.log('Item galeri berhasil ditambahkan dengan ID:', docRef.id);
    return docRef.id;
  } catch (error: any) {
    console.error('Error adding gallery item:', error);
    throw error;
  }
}

/**
 * @param {string} galleryId 
 * @param {Partial<AddGallery & { imageUrl?: string }>} updateData
 * @returns {Promise<void>}
 */
export async function updateGallery(galleryId: string, updateData: Partial<AddGallery & { imageUrl?: string }>): Promise<void> {
  try {
    const galleryRef = doc(db, 'gallery', galleryId); 
    const updatedFields: Partial<Gallery> = {};

    const docSnap = await getDoc(galleryRef);
    if (!docSnap.exists()) {
      throw new Error(`Item galeri dengan ID ${galleryId} tidak ditemukan.`);
    }
    const oldGalleryData = docSnap.data() as Gallery;
    const oldImageUrl = oldGalleryData.imageUrl;

    if (updateData.title) {
      updatedFields.title = updateData.title;
    }
    if (updateData.content) {
      updatedFields.content = updateData.content;
    }

    if (updateData.imageFile) {
      
      if (oldImageUrl) {
        
        const oldFileNameInStorage = oldImageUrl.split('/public/desajatiguwi/')[1];
        if (oldFileNameInStorage) { 
            const { error: deleteOldError } = await supabase.storage
            .from('desajatiguwi')
            .remove([oldFileNameInStorage]);

            if (deleteOldError) {
            console.warn('Peringatan: Gagal menghapus gambar lama dari Supabase:', deleteOldError.message);
            
            }
        }
      }

      
      const folderName = 'gallery-images';
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

    await updateDoc(galleryRef, updatedFields);
    console.log(`Item galeri dengan ID ${galleryId} berhasil diperbarui!`);

  } catch (error: any) {
    console.error(`Error updating gallery item with ID ${galleryId}:`, error);
    throw error;
  }
}

/**
 * @param {string} galleryId - ID dokumen galeri yang akan dihapus.
 * @param {string} imageUrl - URL gambar yang terkait dengan item galeri. Diperlukan untuk menghapus gambar dari Supabase.
 * @returns {Promise<void>}
 */
export async function deleteGallery(galleryId: string, imageUrl: string): Promise<void> {
  try {
    
    const galleryRef = doc(db, 'gallery', galleryId); 
    await deleteDoc(galleryRef);

    
    const urlParts = imageUrl.split('/public/desajatiguwi/');
    if (urlParts.length < 2) {
      console.warn(`Peringatan: URL gambar galeri tidak valid untuk dihapus dari Supabase: ${imageUrl}`);
      
    } else {
      const fileNameInStorage = urlParts[1];

      const { error: deleteError } = await supabase.storage
        .from('desajatiguwi')
        .remove([fileNameInStorage]);

      if (deleteError) {
        console.error('Error deleting image from Supabase:', deleteError);
        
      }
    }

    console.log(`Item galeri dengan ID ${galleryId} dan gambarnya berhasil dihapus!`);
  } catch (error: any) {
    console.error(`Error deleting gallery item with ID ${galleryId}:`, error);
    throw error;
  }
}