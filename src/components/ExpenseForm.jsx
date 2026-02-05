'use client';

import { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocalStorage } from '@/lib/supabase';

export default function ExpenseForm({ onExpenseAdded }) {
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Shopping', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (useLocalStorage) {
        // Store in localStorage for demo mode
        const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        const newExpense = {
          id: Date.now().toString(),
          description: formData.description,
          amount: parseFloat(formData.amount),
          category: formData.category,
          date: formData.date,
        };
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
      } else {
        // Use Supabase
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase
          .from('expenses')
          .insert([
            {
              description: formData.description,
              amount: parseFloat(formData.amount),
              category: formData.category,
              date: formData.date,
            }
          ]);

        if (error) throw error;
      }

      setFormData({
        description: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
      });

      onExpenseAdded();
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Lunch at restaurant"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount ($)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <div className="relative">
            <div className="flex gap-2">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition flex items-center gap-2"
              >
                <CalendarIcon size={20} />
              </button>
            </div>
            {showCalendar && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10">
                <Calendar
                  value={new Date(formData.date)}
                  onChange={(date) => {
                    setFormData(prev => ({
                      ...prev,
                      date: date.toISOString().split('T')[0]
                    }));
                    setShowCalendar(false);
                  }}
                  className="border-0"
                />
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Plus size={20} />
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
}
