export interface PendudukData {
  id?: string;
  AGAMA: string;
  AGAMA_KET: string;
  ALAMAT: string;
  DUSUN: string;
  GOL_DRH: string;
  ID: string;
  JENIS_KLMIN: string;
  JENIS_KLMIN_KET: string;
  JENIS_PKRJN: string;
  JENIS_PKRJN_KET: string;
  KODE_POS: string;
  NAMA_KAB: string;
  NAMA_KEC: string;
  NAMA_KEL: string;
  NAMA_LGKP: string;
  NAMA_LGKP_AYAH: string;
  NAMA_LGKP_IBU: string;
  NAMA_PROP: string;
  NIK: string;
  NO_KAB: string;
  NO_KEC: string;
  NO_KEL: string;
  NO_KK: string;
  NO_PROP: string;
  NO_RT: string;
  NO_RW: string;
  PDDK_AKH: string;
  PENDIDIKAN_AKH_KET: string;
  STAT_HBKEL: string;
  STAT_HBKEL_1: string;
  STAT_KWN_KET: string;
  TELP: string;
  TGL_KWN: string;
}

export type SortDirection = 'asc' | 'desc';

export type FormMode = 'add' | 'edit';

export interface FetchDataParams {
  orderField: keyof PendudukData;
  orderDirection: SortDirection;
  searchTerm?: string;
  searchField?: keyof PendudukData;
  lastDoc?: any;
  dataPerPage: number;
}

export interface FetchDataResult {
  data: PendudukData[];
  lastDoc: any;
  isLastPage: boolean;
}

export const AVAILABLE_FIELDS: (keyof PendudukData)[] = [
  'NIK', 'NAMA_LGKP', 'ALAMAT', 'DUSUN', 'AGAMA_KET', 'JENIS_KLMIN_KET',
  'JENIS_PKRJN_KET', 'PENDIDIKAN_AKH_KET', 'STAT_KWN_KET', 'NAMA_KAB',
  'NAMA_KEC', 'NAMA_KEL', 'NAMA_PROP', 'NO_KK', 'TELP'
];

export const EMPTY_FORM_DATA: Partial<PendudukData> = {
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