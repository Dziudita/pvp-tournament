import Image from "next/image";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/cherzi-logo.png" // tavo logotipo kelias
          alt="Cherzi Arena Logo"
          width={160}
          height={160}
          className="mb-4 animate-pulse"
        />
        <h1 className="text-pink-500 text-2xl font-bold tracking-wide animate-pulse">
          CHERZI ARENA
        </h1>
      </div>
    </div>
  );
}
