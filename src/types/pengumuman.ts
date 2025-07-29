import { Timestamp } from 'firebase/firestore';

export interface PengumumanArticle {
  id: string; 
  title: string;
  content: string;
  date: Timestamp; 
}

export interface AddPengumuman {
  title: string;
  content: string;
}