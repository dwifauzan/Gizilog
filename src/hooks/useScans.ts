import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { ScanHistory } from '../types';

export function useScans() {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchScans = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('scan_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      setError(error);
    } else {
      setScans((data || []) as ScanHistory[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  const refetch = useCallback(() => {
    fetchScans();
  }, [fetchScans]);

  return { scans, loading, error, refetch };
}

export async function addScanHistory(result: Record<string, unknown>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('scan_history')
    .insert({ user_id: user.id, result, accepted: false })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function markScanAccepted(id: string) {
  const { error } = await supabase
    .from('scan_history')
    .update({ accepted: true })
    .eq('id', id);

  if (error) throw error;
}
