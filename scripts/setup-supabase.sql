-- Supabase Setup Script for Expense Tracker
-- This file contains all SQL commands to set up your database
-- Run this in Supabase SQL Editor: Settings > SQL Editor > New Query

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read" ON expenses
  FOR SELECT USING (true);

-- Create public insert policy  
CREATE POLICY "Allow public insert" ON expenses
  FOR INSERT WITH CHECK (true);

-- Create public delete policy
CREATE POLICY "Allow public delete" ON expenses
  FOR DELETE USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_created_at ON expenses(created_at DESC);
