'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/lib/supabase';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseStats from '@/components/ExpenseStats';
import { Loader } from 'lucide-react';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      if (useLocalStorage) {
        // Load from localStorage
        const data = JSON.parse(localStorage.getItem('expenses') || '[]');
        setExpenses(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } else {
        // This would load from Supabase when configured
        const { supabase } = await import('@/lib/supabase');
        if (!supabase) {
          setError('Supabase not configured');
          return;
        }
        const { data, error: fetchError } = await supabase
          .from('expenses')
          .select('*')
          .order('date', { ascending: false });

        if (fetchError) throw fetchError;
        setExpenses(data || []);
      }
    } catch (err) {
      console.error('Error fetching expenses:', err);
      if (!useLocalStorage) {
        setError('Using demo mode with localStorage. Configure Supabase in .env.local for cloud sync.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-blue-600" size={40} />
          <p className="text-gray-600">Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 Expense Tracker</h1>
          <p className="text-gray-600">Track your daily expenses and manage your budget</p>
          {useLocalStorage && (
            <p className="text-sm text-blue-600 mt-2">📝 Demo Mode: Data saved locally in your browser</p>
          )}
        </div>

        {/* Stats */}
        <ExpenseStats expenses={expenses} />

        {/* Form */}
        <ExpenseForm onExpenseAdded={fetchExpenses} />

        {/* Expenses List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Expenses</h2>
          <ExpenseList expenses={expenses} onExpenseDeleted={fetchExpenses} />
        </div>
      </div>
    </main>
  );
}
