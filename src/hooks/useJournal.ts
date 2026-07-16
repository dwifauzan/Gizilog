import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { JournalEntry } from '../types';

export function useJournal(date: string) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEntries = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('entry_date', date)
      .order('created_at', { ascending: true });

    if (error) {
      setError(error);
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  }, [user, date]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const refetch = useCallback(() => {
    fetchEntries();
  }, [fetchEntries]);

  return { entries, loading, error, refetch };
}

export async function addJournalEntry(entry: Omit<JournalEntry, 'id' | 'user_id' | 'created_at'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('journal_entries')
    .insert({ ...entry, user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteJournalEntry(id: string) {
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
