// services/pendudukService.ts
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryConstraint,
} from 'firebase/firestore';
import app from '@/lib/firebase/clientApps';
import { PendudukData } from '@/types/penduduk';

const db = getFirestore(app);
const DATA_PER_PAGE = 10;

interface FetchPendudukOptions {
  limitNumber?: number;
  lastDoc?: QueryDocumentSnapshot | null;
  orderField: keyof PendudukData;
  orderDirection: 'asc' | 'desc';
  searchTerm?: string;
  searchField?: keyof PendudukData;
}

export const emptyPendudukFormData: Partial<PendudukData> = {
  AGAMA: '',
  AGAMA_KET: '',
  ALAMAT: '',
  DUSUN: '',
  GOL_DRH: '',
  ID: '',
  JENIS_KLMIN: '',
  JENIS_KLMIN_KET: '',
  JENIS_PKRJN: '',
  JENIS_PKRJN_KET: '',
  KODE_POS: '',
  NAMA_KAB: '',
  NAMA_KEC: '',
  NAMA_KEL: '',
  NAMA_LGKP: '',
  NAMA_LGKP_AYAH: '',
  NAMA_LGKP_IBU: '',
  NAMA_PROP: '',
  NIK: '',
  NO_KAB: '',
  NO_KEC: '',
  NO_KEL: '',
  NO_KK: '',
  NO_PROP: '',
  NO_RT: '',
  NO_RW: '',
  PDDK_AKH: '',
  PENDIDIKAN_AKH_KET: '',
  STAT_HBKEL: '',
  STAT_HBKEL_1: '',
  STAT_KWN_KET: '',
  TELP: '',
  TGL_KWN: '',
};


export async function fetchPendudukData({
  limitNumber = DATA_PER_PAGE,
  lastDoc = null,
  orderField,
  orderDirection,
  searchTerm,
  searchField,
}: FetchPendudukOptions): Promise<{ data: PendudukData[]; lastVisible: QueryDocumentSnapshot | null; isLastPage: boolean }> {
  let qConstraints: QueryConstraint[] = [];

  if (searchTerm && searchField) {
    qConstraints.push(
      where(searchField, '>=', searchTerm),
      where(searchField, '<=', searchTerm + '\uf8ff'),
      orderBy(searchField, orderDirection) // orderBy is crucial for where clauses
    );
  } else {
    qConstraints.push(orderBy(orderField, orderDirection));
  }

  if (lastDoc) {
    qConstraints.push(startAfter(lastDoc));
  }
  qConstraints.push(limit(limitNumber));

  const pendudukQuery = query(collection(db, 'Penduduk'), ...qConstraints);
  const snapshot = await getDocs(pendudukQuery);
  const docs = snapshot.docs;

  const fetchedData = docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      NIK: String(data.NIK || ''),
      NO_KK: String(data.NO_KK || ''),
    } as PendudukData;
  });

  const lastVisible = docs.length > 0 ? docs[docs.length - 1] : null;
  const isLastPage = docs.length < limitNumber;

  return { data: fetchedData, lastVisible, isLastPage };
}

export async function addPenduduk(personData: Partial<PendudukData>): Promise<PendudukData> {
  const docRef = await addDoc(collection(db, 'Penduduk'), personData);
  return { id: docRef.id, ...personData } as PendudukData;
}

export async function updatePenduduk(id: string, personData: Partial<PendudukData>): Promise<void> {
  await updateDoc(doc(db, 'Penduduk', id), personData);
}

export async function deletePenduduk(id: string): Promise<void> {
  await deleteDoc(doc(db, 'Penduduk', id));
}

export async function getPendudukById(id: string): Promise<PendudukData | null> {
  const docRef = doc(db, 'Penduduk', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      NIK: String(data.NIK || ''),
      NO_KK: String(data.NO_KK || ''),
    } as PendudukData;
  }
  return null;
}