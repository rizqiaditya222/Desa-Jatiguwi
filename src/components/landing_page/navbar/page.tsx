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
    <div className="flex items-center justify-between w-full px-24 py-12">
      {/* Logo image */}
      <img
        className="max-w-80 w-auto"
        src="/img/logo_full.png"
        alt="Logo Desa"
      />

      {/* Navigation buttons */}
      <div className="flex items-center gap-8 mx-auto space-x-8">
        <NavButton text="Beranda" href="/" />
        <NavButton text="Profil" href="/profil/pkk" />
        <NavButton text="Selayang Pandang" href="/selayang-pandang" />
        <NavButton text="Sejarah" href="/sejarah" />
        <NavButton text="Berita" href="/content" />
      </div>

      {/* PrimaryLinkButton will change based on login status */}
      <PrimaryLinkButton text={buttonText} href={buttonHref} />
    </div>
  );
};

export default Navbar;
