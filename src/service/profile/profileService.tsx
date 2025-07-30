// service/profile/profileService.ts
import { db } from '@/lib/firebase/clientApps';
import { Profil } from '@/types/profil';

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  limit,
} from 'firebase/firestore';

type WithId<T> = T & { id: string };
const PROFIL_COL = 'profil';

export async function createProfil(data: Profil): Promise<string> {
  const ref = await addDoc(collection(db, PROFIL_COL), data);
  return ref.id;
}

export async function fetchProfil(): Promise<Array<WithId<Profil>>> {
  const snap = await getDocs(collection(db, PROFIL_COL));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Profil) }));
}

export async function fetchProfilById(docId: string): Promise<WithId<Profil> | null> {
  const ref = doc(db, PROFIL_COL, docId);
  const s = await getDoc(ref);
  return s.exists() ? ({ id: s.id, ...(s.data() as Profil) }) : null;
}

export async function updateProfil(
  docId: string,
  data: Partial<Profil>
): Promise<void> {
  const ref = doc(db, PROFIL_COL, docId);
  await updateDoc(ref, data);
}

export async function updateProfilByDeskripsi(
  deskripsi: string,
  data: Partial<Profil>
): Promise<void> {
  const q = query(collection(db, PROFIL_COL), where('deskripsi', '==', deskripsi), limit(1));
  const s = await getDocs(q);
  if (s.empty) throw new Error(`Profil dengan deskripsi "${deskripsi}" tidak ditemukan.`);
  await updateDoc(s.docs[0].ref, data);
}

export async function updateProfilDeskripsi(docId: string, deskripsiBaru: string): Promise<void> {
  await updateProfil(docId, { deskripsi: deskripsiBaru });
}

// ✅ Fixed parameter types from number to string
export async function updateProfilBpdUrl(docId: string, bpdUrlBaru: string): Promise<void> {
  await updateProfil(docId, { bpdUrl: bpdUrlBaru });
}

export async function updateProfilPkkUrl(docId: string, pkkUrlBaru: string): Promise<void> {
  await updateProfil(docId, { pkkUrl: pkkUrlBaru });
}

export async function updateProfilYtUrl(docId: string, ytUrlBaru: string): Promise<void> {
  await updateProfil(docId, { ytUrl: ytUrlBaru });
}

export async function updateProfilDesaUrl(docId: string, desaUrlBaru: string): Promise<void> {
  await updateProfil(docId, { desaUrl: desaUrlBaru });
}