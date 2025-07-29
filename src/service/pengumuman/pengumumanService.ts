import { db } from '@/lib/firebase/clientApps';
import {
  collection,
  addDoc,
  Timestamp,
  doc, // Import doc for referencing a specific document
  updateDoc, // Import updateDoc for updating documents
  deleteDoc, // Import deleteDoc for deleting documents
} from 'firebase/firestore';
import { PengumumanArticle, AddPengumuman as AddPengumumanData } from '@/types/pengumuman';

/**
 * Menambahkan pengumuman baru ke Firebase.
 * @param {AddPengumumanData} pengumumanData - Objek yang berisi judul dan konten.
 * @returns {Promise<void>}
 */
export async function AddPengumuman(pengumumanData: AddPengumumanData): Promise<void> {
  const { title, content } = pengumumanData;

  try {
    // 1. Simpan data pengumuman ke Firebase Firestore
    const newPengumuman: Omit<PengumumanArticle, 'id'> = {
      title: title,
      content: content,
      date: Timestamp.now(), // Gunakan Timestamp.now() untuk mendapatkan tanggal saat ini
    };

    await addDoc(collection(db, 'pengumuman'), newPengumuman); // Changed collection to 'pengumuman'

    console.log('Pengumuman berhasil ditambahkan!');
  } catch (error: any) {
    console.error('Error adding pengumuman:', error);
    throw error;
  }
}


/**
 * Memperbarui pengumuman yang sudah ada di Firebase.
 * @param {string} pengumumanId - ID dokumen pengumuman yang akan diperbarui.
 * @param {Partial<AddPengumumanData>} updateData - Objek yang berisi data yang akan diperbarui (judul atau konten).
 * @returns {Promise<void>}
 */
export async function updatePengumuman(pengumumanId: string, updateData: Partial<AddPengumumanData>): Promise<void> {
  try {
    const pengumumanRef = doc(db, 'pengumuman', pengumumanId); // Get a reference to the specific document
    await updateDoc(pengumumanRef, updateData); // Update the document with the provided data

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
    const pengumumanRef = doc(db, 'pengumuman', pengumumanId); // Get a reference to the specific document
    await deleteDoc(pengumumanRef); // Delete the document

    console.log(`Pengumuman dengan ID ${pengumumanId} berhasil dihapus!`);
  } catch (error: any) {
    console.error(`Error deleting pengumuman with ID ${pengumumanId}:`, error);
    throw error;
  }
}