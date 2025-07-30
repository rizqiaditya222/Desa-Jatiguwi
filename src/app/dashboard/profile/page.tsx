"use client";

import React from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  fetchProfilById,
  updateProfil,
} from "@/service/profile/profileService";

const BASE_PATH = "/dashboard";
const BUCKET = "desajatiguwi"; // ganti sesuai nama bucket di Supabase
const DOC_ID = "1"; // <-- ambil & update dokumen dengan id '1'

// --- Supabase client (env harus ada di .env.local) ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Ekstrak videoId dari URL YouTube untuk preview ---
function parseYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/");
      const embedIdx = parts.indexOf("embed");
      const shortsIdx = parts.indexOf("shorts");
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
      if (shortsIdx >= 0 && parts[shortsIdx + 1]) return parts[shortsIdx + 1];
    }
    return null;
  } catch {
    return null;
  }
}

// --- Upload gambar ke Supabase Storage, return public URL ---
async function uploadImageToSupabase(file: File, folder: string) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export default function ManageProfilDesaPage() {
  // State profil
  const [deskripsi, setDeskripsi] = React.useState("");
  const [bpdUrl, setBpdUrl] = React.useState("");
  const [lpmdUrl, setLpmdUrl] = React.useState("");
  const [desaUrl, setDesaUrl] = React.useState("");
  const [ytUrl, setYtUrl] = React.useState("");

  // File sementara
  const [bpdFile, setBpdFile] = React.useState<File | null>(null);
  const [lpmdFile, setLpmdFile] = React.useState<File | null>(null);
  const [desaFile, setDesaFile] = React.useState<File | null>(null);

  // UI state
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Load awal via service -> id '1'
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const profil = await fetchProfilById(DOC_ID);
        if (!profil) {
          setStatusMessage('Profil dengan id "1" tidak ditemukan.');
          setIsSuccess(false);
        } else {
          setDeskripsi(profil.deskripsi ?? "");
          setBpdUrl((profil as any).bpdUrl ?? ""); // pastikan tipe string di interface
          setLpmdUrl((profil as any).lpmdUrl ?? "");
          setDesaUrl((profil as any).desaUrl ?? "");
          setYtUrl((profil as any).ytUrl ?? "");
        }
      } catch (e: any) {
        setStatusMessage(`Gagal memuat profil: ${e.message}`);
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] || null;
      if (!f) return;
      if (!f.type.startsWith("image/")) {
        setStatusMessage("File harus berupa gambar (jpeg/png/webp).");
        setIsSuccess(false);
        return;
      }
      if (f.size > 5 * 1024 * 1024) {
        setStatusMessage("Ukuran gambar maksimal 5MB.");
        setIsSuccess(false);
        return;
      }
      setter(f);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");
    setIsSuccess(false);
    setSaving(true);
    try {
      let nextBpdUrl = bpdUrl;
      let nextLpmdUrl = lpmdUrl;
      let nextDesaUrl = desaUrl;

      if (bpdFile)
        nextBpdUrl = await uploadImageToSupabase(bpdFile, "profil/bpd");
      if (lpmdFile)
        nextLpmdUrl = await uploadImageToSupabase(lpmdFile, "profil/lpmd");
      if (desaFile)
        nextDesaUrl = await uploadImageToSupabase(desaFile, "profil/desa");

      await updateProfil(DOC_ID, {
        deskripsi,
        bpdUrl: nextBpdUrl,
        lpmdUrl: nextLpmdUrl,
        desaUrl: nextDesaUrl,
        ytUrl,
      } as any); // pastikan tipe Profil url=string agar tidak perlu `as any`

      setBpdUrl(nextBpdUrl);
      setLpmdUrl(nextLpmdUrl);
      setDesaUrl(nextDesaUrl);

      setIsSuccess(true);
      setStatusMessage("Profil berhasil disimpan!");
      setBpdFile(null);
      setLpmdFile(null);
      setDesaFile(null);
    } catch (e: any) {
      setStatusMessage(`Gagal menyimpan: ${e.message}`);
      setIsSuccess(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">Memuat…</div>;

  const ytId = parseYouTubeId(ytUrl);

  return (
    <div className="px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Kelola Profil Desa</h1>
        <Link
          href={BASE_PATH}
          className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Kembali
        </Link>
      </div>

      {/* Status */}
      {statusMessage && (
        <div
          className={`mb-6 rounded-xl px-4 py-3 text-sm border ${
            isSuccess
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-7"
      >
        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
            rows={5}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Tulis deskripsi singkat tentang desa..."
            required
          />
        </div>

        {/* Gambar-gambar (BPD, PKK, Desa) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {" "}
          {/* Added grid for horizontal layout */}
          {/* Desa */}
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gambar Desa
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange(setDesaFile)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG/PNG/WebP, maks 5MB.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center border rounded-xl p-2 bg-gray-50">
              {desaFile ? (
                <img
                  src={URL.createObjectURL(desaFile)}
                  alt="Preview Desa"
                  className="max-h-40 rounded-lg object-contain"
                />
              ) : desaUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={desaUrl}
                  alt="Desa"
                  className="max-h-40 rounded-lg object-contain"
                />
              ) : (
                <span className="text-sm text-gray-500">Belum ada gambar</span>
              )}
            </div>
          </div>
          {/* BPD */}
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gambar BPD
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange(setBpdFile)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG/PNG/WebP, maks 5MB.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center border rounded-xl p-2 bg-gray-50">
              {bpdFile ? (
                <img
                  src={URL.createObjectURL(bpdFile)}
                  alt="Preview BPD"
                  className="max-h-40 rounded-lg object-contain"
                />
              ) : bpdUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={bpdUrl}
                  alt="BPD"
                  className="max-h-40 rounded-lg object-contain"
                />
              ) : (
                <span className="text-sm text-gray-500">Belum ada gambar</span>
              )}
            </div>
          </div>
          {/* LPMD */}
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gambar LPMD
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange(setLpmdFile)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG/PNG/WebP, maks 5MB.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center border rounded-xl p-2 bg-gray-50">
              {lpmdFile ? (
                <img
                  src={URL.createObjectURL(lpmdFile)}
                  alt="Preview PKK"
                  className="max-h-40 rounded-lg object-contain"
                />
              ) : lpmdUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={lpmdUrl}
                  alt="PKK"
                  className="max-h-40 rounded-lg object-contain"
                />
              ) : (
                <span className="text-sm text-gray-500">Belum ada gambar</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube URL
          </label>
          <input
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E4D45]"
            value={ytUrl}
            onChange={(e) => setYtUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
          />
          <div className="mt-3 border rounded-xl p-3 bg-gray-50">
            {ytUrl && ytId ? (
              <div className="aspect-video w-full">
                <iframe
                  title="Preview YouTube"
                  src={`https://www.youtube.com/embed/${ytId}`} // ✅ Fixed: removed extra $
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : ytUrl ? (
              <p className="text-sm text-red-600">
                URL YouTube tidak valid. Periksa kembali.
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Masukkan URL YouTube untuk melihat preview.
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-xl bg-[#0E4D45] text-white px-4 py-2.5 font-medium shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E4D45] disabled:opacity-60"
          >
            {saving ? "Menyimpan…" : "Simpan Perubahan"}
          </button>
          <Link
            href={BASE_PATH}
            className="flex-1 text-center rounded-xl bg-gray-100 text-gray-800 px-4 py-2.5 font-medium hover:bg-gray-200"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
