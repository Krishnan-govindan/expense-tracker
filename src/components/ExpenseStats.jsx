'use client';

import { useState, useMemo } from 'react';
import { TrendingDown, Calendar } from 'lucide-react';

export default function ExpenseStats({ expenses }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const stats = useMemo(() => {
    const filteredExpenses = expenses.filter(expense =>
      expense.date.startsWith(selectedMonth)
    );

    const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    const byCategory = {};
    filteredExpenses.forEach(exp => {
      byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
    });

    return { total, byCategory, count: filteredExpenses.length };
  }, [expenses, selectedMonth]);

  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toISOString().slice(0, 7);
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingDown size={24} className="text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Expense Summary</h2>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto">
        {months.map(month => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition ${
              selectedMonth === month
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {new Date(month).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Total Spent</p>
          <p className="text-3xl font-bold text-blue-600">${stats.total.toFixed(2)}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Transactions</p>
          <p className="text-3xl font-bold text-green-600">{stats.count}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Average</p>
          <p className="text-3xl font-bold text-purple-600">
            ${stats.count > 0 ? (stats.total / stats.count).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      {Object.keys(stats.byCategory).length > 0 && (
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-800 mb-3">By Category</h3>
          <div className="space-y-2">
            {Object.entries(stats.byCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-gray-700">{category}</span>
                <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
