import React from 'react';
import NavButton from './nav_button/page';
import PrimaryLinkButton from '@/components/button/primary_button';
import SecondaryLinkButton from '@/components/button/secondary_button';

// Define the props interface for Navbar
interface NavbarProps {
  isLoggedIn: boolean; // Prop to indicate if the user is logged in
}

// Navbar component now accepts isLoggedIn as a prop
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  // Determine button text and href based on isLoggedIn prop
  const buttonText = isLoggedIn ? "Dashboard" : "Login";
  const buttonHref = isLoggedIn ? "/dashboard/all" : "/auth/login";

  return (
    <div className='w-full px-24 py-12 flex items-center justify-between'>
      {/* Logo image */}
      <img className='w-2xs' src="\img\logo_full.png" alt="Logo Desa" />

      {/* Navigation buttons */}
      <div>
        <NavButton text="Beranda" href="/" /> {/* Added a default href for Beranda */}
        <NavButton text="Profil" href="/profil" /> {/* Added a default href for Profil */}
        <NavButton text="Selayang Pandang" href="/selayang-pandang" /> {/* Added a default href */}
        <NavButton text="Sejarah" href="/sejarah" /> {/* Added a default href */}
        <NavButton text="Galeri" href="/galeri" /> {/* Added a default href */}
        <NavButton text="Kontak" href="/kontak" /> {/* Added a default href */}
      </div>
      
      {/* PrimaryLinkButton will change based on login status */}
      <PrimaryLinkButton text={buttonText} href={buttonHref} />

    </div>
  );
};

export default Navbar;