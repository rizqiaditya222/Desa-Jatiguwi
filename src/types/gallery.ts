import { Timestamp } from 'firebase/firestore';

export interface Gallery {
  id: string; 
  title: string;
  imageUrl: string;
  date: Timestamp; 
  slug: string;
}

export interface AddGallery {
  title: string;
  imageFile: File;
}