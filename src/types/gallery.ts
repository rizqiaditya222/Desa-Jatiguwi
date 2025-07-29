import { Timestamp } from 'firebase/firestore';

export interface Gallery {
  id: string; 
  title: string;
  content: string;
  imageUrl: string;
  date: Timestamp; 
}

export interface AddGallery {
  title: string;
  content: string;
  imageFile: File;
}