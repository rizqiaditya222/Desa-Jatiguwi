import React from 'react'
import NavButton from './nav_button/page'
import PrimaryLinkButton from '@/components/button/primary_button'
import SecondaryLinkButton from '@/components/button/secondary_button'

const Navbar = () => {
  return (
    <div className='w-full px-24 py-12 flex items-center justify-between'>
        <img className='w-2xs' src="img/logo_full.png" alt="" />

      <div>
        <NavButton text="Beranda" href=""/>
        <NavButton text="Profil" href=""/>
        <NavButton text="Selayang Pandang" href=""/>
        <NavButton text="Sejarah" href=""/>
        <NavButton text="Galeri" href=""/>
        <NavButton text="Kontak" href=""/>
      </div>
      
      <PrimaryLinkButton text="Login" href="/login" />

    </div>
  )
}
export default Navbar
