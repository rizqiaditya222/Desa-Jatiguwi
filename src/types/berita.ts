import { Timestamp } from 'firebase/firestore';

export interface NewsArticle {
  id: string; 
  title: string;
  content: string;
  imageUrl: string;
  date: Timestamp;
}

export interface AddNewsData {
  title: string;
  content: string;
  imageFile: File;
}