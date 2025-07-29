  import { Timestamp } from 'firebase/firestore';

  export interface PengumumanArticle {
    id: string; 
    title: string;
    content: string;
    date: Timestamp; 
    slug: string;
    category: string;
  }

  export interface AddPengumuman {
    title: string;
    category: string;
    content: string;
  }