import React, { useState } from "react";
import NavButton from "./nav_button/page";
import PrimaryLinkButton from "@/components/button/primary_button";
import SecondaryLinkButton from "@/components/button/secondary_button";

// Define the props interface for Navbar
interface NavbarProps {
  isLoggedIn: boolean; // Prop to indicate if the user is logged in
}

// Navbar component now accepts isLoggedIn as a prop
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine button text and href based on isLoggedIn prop
  const buttonText = isLoggedIn ? "Dashboard" : "Login";
  const buttonHref = isLoggedIn ? "/dashboard/all" : "/auth/login";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="w-full px-4 py-4 md:px-12 md:py-12">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto max-w-[200px] object-contain sm:h-10 md:h-12 md:max-w-[240px] lg:max-w-[280px]"
              src="/img/logo_full.png"
              alt="Logo Desa"
            />
          </div>

          {/* Desktop Navigation - Hidden on mobile and tablet */}
          <div className="hidden xl:flex items-center justify-center gap-6 2xl:gap-8">
            <NavButton text="Beranda" href="/" />
            <NavButton text="Profil" href="/profil" />
            <NavButton text="Selayang Pandang" href="/selayang-pandang" />
            <NavButton text="Sejarah" href="/sejarah" />
            <NavButton text="Berita" href="/content" />
          </div>

          {/* Desktop Auth Button - Hidden on mobile and tablet */}
          <div className="hidden xl:flex items-center">
            <PrimaryLinkButton text={buttonText} href={buttonHref} />
          </div>

          {/* Mobile Menu Button - Visible on tablet and mobile */}
          <div className="xl:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Visible when menu is open on tablet and mobile */}
      <div className={`xl:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-gray-200 shadow-lg">
          {/* Mobile Navigation Links */}
          <div className="space-y-3">
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <NavButton text="Beranda" href="/" />
            </div>
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <NavButton text="Profil" href="/profil" />
            </div>
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <NavButton text="Selayang Pandang" href="/selayang-pandang" />
            </div>
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <NavButton text="Sejarah" href="/sejarah" />
            </div>
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <NavButton text="Berita" href="/content" />
            </div>
          </div>
          
          {/* Mobile Auth Button */}
          <div className="pt-4 border-t border-gray-200">
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <PrimaryLinkButton text={buttonText} href={buttonHref} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;