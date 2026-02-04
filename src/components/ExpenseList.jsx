'use client';

import { Trash2 } from 'lucide-react';
import { useLocalStorage } from '@/lib/supabase';

const categoryColors = {
  'Food': 'bg-orange-100 text-orange-800',
  'Transport': 'bg-blue-100 text-blue-800',
  'Entertainment': 'bg-purple-100 text-purple-800',
  'Utilities': 'bg-green-100 text-green-800',
  'Health': 'bg-red-100 text-red-800',
  'Shopping': 'bg-pink-100 text-pink-800',
  'Other': 'bg-gray-100 text-gray-800',
};

export default function ExpenseList({ expenses, onExpenseDeleted }) {
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      if (useLocalStorage) {
        // Delete from localStorage for demo mode
        const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        const filtered = expenses.filter(exp => exp.id !== id);
        localStorage.setItem('expenses', JSON.stringify(filtered));
      } else {
        // Use Supabase
        const { supabase } = await import('@/lib/supabase');
        const { error } = await supabase
          .from('expenses')
          .delete()
          .eq('id', id);

        if (error) throw error;
      }
      onExpenseDeleted();
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">No expenses yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map(expense => (
        <div
          key={expense.id}
          className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[expense.category]}`}>
                {expense.category}
              </span>
              <span className="text-gray-600 text-sm">
                {new Date(expense.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <p className="text-gray-800 font-medium">{expense.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900">
              ${expense.amount.toFixed(2)}
            </span>
            <button
              onClick={() => handleDelete(expense.id)}
              className="text-red-500 hover:text-red-700 transition"
              title="Delete expense"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
