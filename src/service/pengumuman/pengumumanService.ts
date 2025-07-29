import { db } from '@/lib/firebase/clientApps';
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { PengumumanArticle, AddPengumuman as AddPengumumanData } from '@/types/pengumuman';

/**
 * Generates a URL-friendly slug from a given string.
 * @param {string} text - The input string (e.g., title).
 * @returns {string} The generated slug.
 */
function generateSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD') // Normalize diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple hyphens with single
}

/**
 * Menambahkan pengumuman baru ke Firebase.
 * @param {AddPengumumanData} pengumumanData - Objek yang berisi judul dan konten.
 * @returns {Promise<void>}
 */
export async function AddPengumuman(pengumumanData: AddPengumumanData): Promise<void> {
  const { title, content } = pengumumanData;
  const slug = generateSlug(title); // Generate the slug here

  try {
    const newPengumuman: Omit<PengumumanArticle, 'id'> = {
      title: title,
      content: content,
      date: Timestamp.now(),
      slug: slug, // Add the generated slug
    };

    await addDoc(collection(db, 'pengumuman'), newPengumuman);

    console.log('Pengumuman berhasil ditambahkan!');
  } catch (error: any) {
    console.error('Error adding pengumuman:', error);
    throw error;
  }
}

/**
 * Memperbarui pengumuman yang sudah ada di Firebase.
 * @param {string} pengumumanId - ID dokumen pengumuman yang akan diperbarui.
 * @param {Partial<AddPengumumanData & { slug?: string }>} updateData - Objek yang berisi data yang akan diperbarui (judul, konten, atau slug).
 * @returns {Promise<void>}
 */
export async function updatePengumuman(pengumumanId: string, updateData: Partial<AddPengumumanData & { slug?: string }>): Promise<void> {
  try {
    if (updateData.title) {
      updateData.slug = generateSlug(updateData.title);
    }

    const pengumumanRef = doc(db, 'pengumuman', pengumumanId);
    await updateDoc(pengumumanRef, updateData);

    console.log(`Pengumuman dengan ID ${pengumumanId} berhasil diperbarui!`);
  } catch (error: any) {
    console.error(`Error updating pengumuman with ID ${pengumumanId}:`, error);
    throw error;
  }
}

/**
 * Menghapus pengumuman dari Firebase.
 * @param {string} pengumumanId - ID dokumen pengumuman yang akan dihapus.
 * @returns {Promise<void>}
 */
export async function deletePengumuman(pengumumanId: string): Promise<void> {
  try {
    const pengumumanRef = doc(db, 'pengumuman', pengumumanId);
    await deleteDoc(pengumumanRef);

    console.log(`Pengumuman dengan ID ${pengumumanId} berhasil dihapus!`);
  } catch (error: any) {
    console.error(`Error deleting pengumuman with ID ${pengumumanId}:`, error);
    throw error;
  }
}