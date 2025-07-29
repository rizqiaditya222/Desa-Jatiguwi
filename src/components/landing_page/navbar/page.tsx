import React from "react";
import NavButton from "./nav_button/page";
import PrimaryLinkButton from "@/components/button/primary_button";
import SecondaryLinkButton from "@/components/button/secondary_button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-24 py-12">
      <img className="w-2xs" src="img/logo_full.png" alt="" />

      <div>
        <NavButton text="Beranda" href="" />
        <NavButton text="Profil" href="" />
        <NavButton text="Selayang Pandang" href="" />
        <NavButton text="Sejarah" href="" />
        <NavButton text="Galeri" href="" />
        <NavButton text="Berita" href="" />
      </div>

      <PrimaryLinkButton text="Login" href="/auth/login" />
    </div>
  );
};
export default Navbar;
