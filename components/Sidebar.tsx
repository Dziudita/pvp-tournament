 "use client";
 import { useState } from "react";
 import Link from "next/link";
 import {
   FaGamepad,
   FaScroll,
 @@ -11,9 +10,9 @@ import {
   FaChevronLeft,
   FaChevronRight,
   FaWallet,
 } from 'react-icons/fa';
 import { supabase } from '@/lib/supabaseClient';
 import WalletModal from '@/components/WalletModal';
 } from "react-icons/fa";
 import { supabase } from "@/lib/supabaseClient";
 import WalletModal from "@/components/WalletModal";
 
 interface SidebarProps {
   collapsed: boolean;
 @@ -24,14 +23,12 @@ export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
   const [showWalletModal, setShowWalletModal] = useState(false);
 
   const handleLogout = async () => {
     console.log('🚪 Bandome atsijungti...');
     const { error } = await supabase.auth.signOut();
     if (error) {
       console.error('❌ Atsijungimo klaida:', error.message);
       console.error("❌ Atsijungimo klaida:", error.message);
     } else {
       console.log('✅ Atsijungta iš Supabase');
       localStorage.removeItem('cherzi-nick');
       localStorage.removeItem('cherzi-pass');
       localStorage.removeItem("cherzi-nick");
       localStorage.removeItem("cherzi-pass");
       setTimeout(() => {
         window.location.reload();
       }, 500);
 @@ -41,26 +38,19 @@ export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
   return (
     <>
       <aside
         className={`fixed top-16 left-0 ${collapsed ? 'w-14' : 'w-40'} h-[calc(100vh-4rem)] bg-zinc-900 bg-opacity-90 border-r border-pink-500 text-white shadow-xl z-40 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(255,0,255,0.3)]`}
         className={`fixed top-16 left-0 ${collapsed ? "w-14" : "w-40"} h-[calc(100vh-4rem)] bg-zinc-900 bg-opacity-90 border-r border-pink-500 text-white shadow-xl z-40 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(255,0,255,0.3)]`}
       >
         {/* Suskleidimo mygtukas */}
         <div className="flex justify-end p-2">
           <button
             onClick={() => setCollapsed(!collapsed)}
             className="text-pink-400 hover:text-pink-300"
           >
             {collapsed ? (
               <FaChevronRight size={20} />
             ) : (
               <FaChevronLeft size={20} />
             )}
             {collapsed ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
           </button>
         </div>
 
         {/* Neon glow fone */}
         <div className="absolute bottom-0 left-0 w-52 h-52 bg-gradient-to-tr from-pink-500 to-purple-500 opacity-20 blur-2xl rounded-full z-0"></div>
 
         {/* Navigacija */}
         <nav className="flex flex-col gap-5 text-md mt-8 relative z-10 px-3">
           <Link
             href="/game"
 @@ -113,10 +103,10 @@ export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
       </aside>
 
       {showWalletModal && (
        <WalletModal
   onClose={() => setShowWalletModal(false)}
   refreshBalance={() => {}}
 />
         <WalletModal
           onClose={() => setShowWalletModal(false)}
           refreshBalance={() => {}} // galima perdaryti jei nori iš Sidebar
         />
       )}
     </>
   );
