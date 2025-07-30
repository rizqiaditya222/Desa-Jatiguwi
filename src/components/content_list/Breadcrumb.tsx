import React from "react";
import Link from "next/link";
import { TabType } from "@/types/articles";

interface BreadcrumbProps {
  selectedTab: TabType;
}

export default function Breadcrumb({ selectedTab }: BreadcrumbProps) {
  return (
    <div className="bg-gray-200 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-teal-600">
            Beranda
          </Link>
          <span className="mx-2">/</span>
          <span className="hover:text-teal-600">
            {selectedTab === "berita" ? "Berita" : "Pengumuman"}
          </span>
        </nav>
      </div>
    </div>
  );
}
