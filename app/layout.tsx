import './globals.css';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import Loader from '@/components/Loader';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const metadata = {
  title: 'Cherzi',
  description: 'Compete daily and win USDC + exclusive rewards.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setLoggedIn(!!data.session?.user);
      setLoading(false);
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <body className="bg-black text-white min-h-screen">
          <Loader />
        </body>
      </html>
    );
  }

  if (!loggedIn) {
    return (
      <html lang="en">
        <body className="bg-black text-white min-h-screen">
          <LoginModal />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
