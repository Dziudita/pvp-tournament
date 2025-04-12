"use client";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("cherzi-nick");
    localStorage.removeItem("cherzi-pass");
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-4 text-pink-100 hover:text-pink-400"
    >
      <div className="w-10 h-10 bg-pink-500/80 hover:bg-pink-400 transition rounded-full flex items-center justify-center shadow-md">
        🔒
      </div>
      Logout
    </button>
  );
}
