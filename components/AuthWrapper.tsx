'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import LoginModal from './LoginModal';
import Loader from './Loader';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <Loader />;
  if (!session) return <LoginModal />;

  return <>{children}</>;
}

 
