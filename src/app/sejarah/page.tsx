"use client";
import React from "react";
import Navbar from "@/components/landing_page/navbar/page";
import { useAuth } from "@/app/auth/context/AuthContext";
import Sejarah from "@/components/sejarah/page";
import Footer from "@/components/landing_page/footer/page";
const SejarahPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar isLoggedIn={!!user} />
      <Sejarah />
      <Footer />
    </div>
  );
};

export default SejarahPage;
