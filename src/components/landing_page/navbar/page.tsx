import React from "react";
import NavButton from "./nav_button/page";
import PrimaryLinkButton from "@/components/button/primary_button";
import SecondaryLinkButton from "@/components/button/secondary_button";

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
    <div className="md:px-8 md:py-12 flex items-center justify-between gap-4 px-4 py-6 space-x-2 overflow-auto">
      <div className="flex-1/4 xl:justify-center flex items-center justify-start">
        {/* Logo image */}
        <img
          className="max-w-80 md:max-w-60 object-contain"
          src="/img/logo_full.png"
          alt="Logo Desa"
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex-1/2 flex items-center justify-center gap-8">
        <NavButton text="Beranda" href="/" />
        <NavButton text="Profil" href="/profil" />
        <NavButton text="Selayang Pandang" href="/selayang-pandang" />
        <NavButton text="Sejarah" href="/sejarah" />
        <NavButton text="Berita" href="/content" />
      </div>
      <div className="flex-1/4 xl:justify-center flex items-center justify-end">
        {/* PrimaryLinkButton will change based on login status */}

        <PrimaryLinkButton text={buttonText} href={buttonHref} />
      </div>
    </div>
  );
};

export default Navbar;
