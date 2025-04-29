"use client";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-pink-400 text-sm font-bold tracking-wide animate-pulse">Loading Cherry Arena...</p>
      </div>
    </div>
  );
}
