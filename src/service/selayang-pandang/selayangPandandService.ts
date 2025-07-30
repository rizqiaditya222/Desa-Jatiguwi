// selayangPandangService.ts
import { db } from '@/lib/firebase/clientApps';
import { Agama } from '@/types/agama';
import { Demografis } from '@/types/demografis';
import { Lahan } from '@/types/lahan';
import { Profesi } from '@/types/profesi';
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

// Util kecil: tambahkan id dokumen saat fetch
type WithId<T> = T & { id: string };

/* ===========================
   AGAMA
   =========================== */

/** Ambil semua data agama (dengan id dokumen). */
export async function fetchAgama(): Promise<Array<WithId<Agama>>> {
  const snap = await getDocs(collection(db, 'agama'));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Agama) }));
}

/** Ambil satu data agama by docId. */
export async function fetchAgamaById(docId: string): Promise<WithId<Agama> | null> {
  const ref = doc(db, 'agama', docId);
  const s = await getDoc(ref);
  return s.exists() ? ({ id: s.id, ...(s.data() as Agama) }) : null;
}

/** Update nilai jumlah untuk satu agama by docId. */
export async function updateAgamaJumlah(docId: string, jumlahBaru: number): Promise<void> {
  const ref = doc(db, 'agama', docId);
  await updateDoc(ref, { jumlah: jumlahBaru });
}

/** Update nilai jumlah untuk satu agama by nama (jika nama unik). */
export async function updateAgamaJumlahByNama(agamaName: string, jumlahBaru: number): Promise<void> {
  const q = query(collection(db, 'agama'), where('agama', '==', agamaName), limit(1));
  const s = await getDocs(q);
  if (s.empty) throw new Error(`Agama dengan nama "${agamaName}" tidak ditemukan.`);
  await updateDoc(s.docs[0].ref, { jumlah: jumlahBaru });
}


/* ===========================
   PROFESI
   =========================== */

/** Ambil semua data profesi. */
export async function fetchProfesi(): Promise<Array<WithId<Profesi>>> {
  const snap = await getDocs(collection(db, 'profesi'));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Profesi) }));
}

/** Ambil satu profesi by docId. */
export async function fetchProfesiById(docId: string): Promise<WithId<Profesi> | null> {
  const ref = doc(db, 'profesi', docId);
  const s = await getDoc(ref);
  return s.exists() ? ({ id: s.id, ...(s.data() as Profesi) }) : null;
}

/** Update nilai jumlah untuk satu profesi by docId. */
export async function updateProfesiJumlah(docId: string, jumlahBaru: number): Promise<void> {
  const ref = doc(db, 'profesi', docId);
  await updateDoc(ref, { jumlah: jumlahBaru });
}

/** Update nilai jumlah untuk satu profesi by nama (jika nama unik). */
export async function updateProfesiJumlahByNama(nama: string, jumlahBaru: number): Promise<void> {
  const q = query(collection(db, 'profesi'), where('nama', '==', nama), limit(1));
  const s = await getDocs(q);
  if (s.empty) throw new Error(`Profesi dengan nama "${nama}" tidak ditemukan.`);
  await updateDoc(s.docs[0].ref, { jumlah: jumlahBaru });
}


/* ===========================
   DEMOGRAFIS
   =========================== */

/** Ambil semua data demografis. */
export async function fetchDemografis(): Promise<Array<WithId<Demografis>>> {
  const snap = await getDocs(collection(db, 'demografis'));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Demografis) }));
}

/** Ambil satu demografis by docId. */
export async function fetchDemografisById(docId: string): Promise<WithId<Demografis> | null> {
  const ref = doc(db, 'demografis', docId);
  const s = await getDoc(ref);
  return s.exists() ? ({ id: s.id, ...(s.data() as Demografis) }) : null;
}

/** Partial update untuk demografis: kirim hanya field yang ingin diubah (rt/rw/kk/jiwa). */
export async function updateDemografis(
  docId: string,
  data: Partial<Pick<Demografis, 'rt' | 'rw' | 'kk' | 'jiwa'>>
): Promise<void> {
  const ref = doc(db, 'demografis', docId);
  await updateDoc(ref, data);
}

/** Helper setter per field (opsional digunakan di UI agar eksplisit). */
export async function updateDemografisRt(docId: string, rtBaru: number): Promise<void> {
  await updateDemografis(docId, { rt: rtBaru });
}
export async function updateDemografisRw(docId: string, rwBaru: number): Promise<void> {
  await updateDemografis(docId, { rw: rwBaru });
}
export async function updateDemografisKk(docId: string, kkBaru: number): Promise<void> {
  await updateDemografis(docId, { kk: kkBaru });
}
export async function updateDemografisJiwa(docId: string, jiwaBaru: number): Promise<void> {
  await updateDemografis(docId, { jiwa: jiwaBaru });
}

/** Update demografis by nama (jika nama unik). */
export async function updateDemografisByNama(
  nama: string,
  data: Partial<Pick<Demografis, 'rt' | 'rw' | 'kk' | 'jiwa'>>
): Promise<void> {
  const q = query(collection(db, 'demografis'), where('nama', '==', nama), limit(1));
  const s = await getDocs(q);
  if (s.empty) throw new Error(`Demografis dengan nama "${nama}" tidak ditemukan.`);
  await updateDoc(s.docs[0].ref, data);
}


/** Ambil semua data lahan. */
export async function fetchLahan(): Promise<Array<WithId<Lahan>>> {
  const snap = await getDocs(collection(db, 'lahan'));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Lahan) }));
}

/** Ambil satu lahan by docId. */
export async function fetchLahanById(docId: string): Promise<WithId<Lahan> | null> {
  const ref = doc(db, 'lahan', docId);
  const s = await getDoc(ref);
  return s.exists() ? ({ id: s.id, ...(s.data() as Lahan) }) : null;
}

/** Update nilai luas untuk lahan by docId. */
export async function updateLahanLuas(docId: string, luasBaru: number): Promise<void> {
  const ref = doc(db, 'lahan', docId);
  await updateDoc(ref, { luas: luasBaru });
}

/** Update nilai luas untuk lahan by nama (jika nama unik). */
export async function updateLahanLuasByNama(nama: string, luasBaru: number): Promise<void> {
  const q = query(collection(db, 'lahan'), where('nama', '==', nama), limit(1));
  const s = await getDocs(q);
  if (s.empty) throw new Error(`Lahan dengan nama "${nama}" tidak ditemukan.`);
  await updateDoc(s.docs[0].ref, { luas: luasBaru });
}
