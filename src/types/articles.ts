import { Timestamp } from 'firebase/firestore'

export interface Article {
  id: string
  title: string
  content: string
  date: Timestamp
  slug: string
  category?: string // Only for pengumuman
  imageUrl?: string // Only for berita
}

export type TabType = 'berita' | 'pengumuman'