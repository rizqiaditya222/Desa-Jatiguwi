import { db } from '@/lib/firebase/clientApps';
import { supabase } from '@/lib/supabase/supabaseConfig';
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore';
import { AddGallery, Gallery } from '@/types/gallery';

const COLLECTION_NAME = 'galeri'; // ganti jika ingin

/** Generate slug sederhana */
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

/** Pastikan slug unik (opsional excludeId saat update) */
async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const snap = await getDocs(query(collection(db, COLLECTION_NAME), where('slug', '==', slug), limit(1)));
    const taken = snap.docs.some((d) => d.id !== excludeId);
    if (!taken) return slug;
    n += 1;
    slug = `${baseSlug}-${n}`;
  }
}

/** Ambil satu dokumen berdasarkan slug */
async function getDocBySlug(slug: string): Promise<{ id: string; data: Gallery }> {
  const snap = await getDocs(query(collection(db, COLLECTION_NAME), where('slug', '==', slug), limit(1)));
  if (snap.empty) throw new Error(`Galeri dengan slug "${slug}" tidak ditemukan.`);
  const d = snap.docs[0];
  return { id: d.id, data: { id: d.id, ...(d.data() as Omit<Gallery, 'id'>) } as Gallery };
}

/** List data (opsional kalau mau dipakai di server components) */
export async function listGallery(): Promise<Gallery[]> {
  const snap = await getDocs(query(collection(db, COLLECTION_NAME), orderBy('date', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Gallery, 'id'>) })) as Gallery[];
}

/** Tambah galeri baru — return slug */
export async function addGallery(payload: AddGallery): Promise<string> {
  const { title, imageFile } = payload;

  // Upload gambar ke Supabase
  const folder = 'gallery-images';
  const fileName = `${folder}/${Date.now()}-${imageFile.name}`;
  const { error: upErr } = await supabase.storage.from('desajatiguwi').upload(fileName, imageFile);
  if (upErr) throw new Error(`Gagal mengunggah gambar: ${upErr.message}`);

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/desajatiguwi/${fileName}`;

  const baseSlug = generateSlug(title);
  const slug = await ensureUniqueSlug(baseSlug);

  const docData: Omit<Gallery, 'id'> = {
    title,
    imageUrl,
    date: Timestamp.now(),
    slug,
  };

  await addDoc(collection(db, COLLECTION_NAME), docData);
  return slug;
}

/** Ambil satu galeri via slug (untuk halaman edit/detail) */
export async function fetchGalleryBySlug(slug: string): Promise<Gallery> {
  const { data } = await getDocBySlug(slug);
  return data;
}

/** Update galeri via slug — return slug final (bisa berubah jika title berubah) */
export async function updateGalleryBySlug(
  currentSlug: string,
  update: Partial<AddGallery & { imageUrl?: string }>
): Promise<string> {
  const { id, data: old } = await getDocBySlug(currentSlug);
  const updated: Partial<Gallery> = {};

  // Title → berpotensi ganti slug
  if (update.title) {
    updated.title = update.title;
    const base = generateSlug(update.title);
    updated.slug = await ensureUniqueSlug(base, id);
  }

  // Gambar baru?
  if (update.imageFile) {
    // Hapus gambar lama jika ada
    if (old.imageUrl) {
      const parts = old.imageUrl.split('/public/desajatiguwi/');
      if (parts.length >= 2) {
        const oldFile = parts[1];
        await supabase.storage.from('desajatiguwi').remove([oldFile]);
      }
    }
    const folder = 'gallery-images';
    const fileName = `${folder}/${Date.now()}-${update.imageFile.name}`;
    const { error: upErr } = await supabase.storage.from('desajatiguwi').upload(fileName, update.imageFile);
    if (upErr) throw new Error(`Gagal mengunggah gambar baru: ${upErr.message}`);
    updated.imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/desajatiguwi/${fileName}`;
  } else if (update.imageUrl) {
    updated.imageUrl = update.imageUrl;
  }

  await updateDoc(doc(db, COLLECTION_NAME, id), updated);
  return updated.slug ?? old.slug;
}

/** Hapus galeri via slug (hapus file di Supabase juga) */
export async function deleteGalleryBySlug(slug: string): Promise<void> {
  const { id, data } = await getDocBySlug(slug);

  if (data.imageUrl) {
    const parts = data.imageUrl.split('/public/desajatiguwi/');
    if (parts.length >= 2) {
      const file = parts[1];
      await supabase.storage.from('desajatiguwi').remove([file]);
    }
  }

  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
