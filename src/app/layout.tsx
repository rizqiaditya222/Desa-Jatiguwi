// src/app/layout.tsx
import './globals.css';
// Jika Anda masih menggunakan Inter atau font Google lainnya, biarkan baris ini.
// Jika tidak, Anda bisa menghapusnya.
import { Inter } from 'next/font/google'; 

// Impor fungsi localFont dari 'next/font/local'
import localFont from 'next/font/local';

// Definisikan font lokal Anda
// Anda bisa memberikan nama variabel font apa pun yang Anda inginkan
const plusJakartaSans = localFont({
  src: [
    // Varian Normal
    {
      path: '../../public/font/PlusJakartaSans-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/font/PlusJakartaSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/font/PlusJakartaSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/font/PlusJakartaSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/font/PlusJakartaSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/font/PlusJakartaSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/font/PlusJakartaSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    // Varian Italic
    {
      path: '../../public/font/PlusJakartaSans-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/font/PlusJakartaSans-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/font/PlusJakartaSans-Italic.ttf', 
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/font/PlusJakartaSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/font/PlusJakartaSans-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/font/PlusJakartaSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/font/PlusJakartaSans-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-plus-jakarta-sans', // Opsional: Definisikan variabel CSS untuk font ini
  display: 'swap', // Direkomendasikan untuk performa
});

// Jika Anda masih menggunakan Inter atau font Google lainnya
const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Tambahkan nama kelas font ke elemen html atau body
    // Jika menggunakan variabel, tambahkan juga kelas variabelnya
    <html lang="en" className={`${plusJakartaSans.className} ${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
