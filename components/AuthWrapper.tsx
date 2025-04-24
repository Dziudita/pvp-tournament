'use client'; // <- turi būti viršuje

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from './Header';
import LoginModal from './LoginModal';
import Loader from './Loader';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
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

  if (loading) return <Loader />;
  if (!loggedIn) return <LoginModal />;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
