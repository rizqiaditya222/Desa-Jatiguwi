"use client";
import React from "react";
import Navbar from "@/components/landing_page/navbar/page";
import { useAuth } from "@/app/auth/context/AuthContext";
const SelayangPandangPage = () => {
  const { user } = useAuth();
  return (
    <div>
      <Navbar isLoggedIn={!!user} />
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">SelayangPandang</h1>
      </div>
    </div>
  );
};

export default SelayangPandangPage;
