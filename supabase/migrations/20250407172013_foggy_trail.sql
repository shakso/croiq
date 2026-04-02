/*
  # Fix blog posts RLS policies

  1. Changes
    - Drop and recreate INSERT policy for blog_posts table to ensure proper author_id check
    - Ensure proper function usage for auth.uid()

  2. Security
    - Maintains existing security model
    - Uses correct auth.uid() function for policy checks
*/

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON blog_posts;

-- Recreate INSERT policy with correct auth.uid() function
CREATE POLICY "Authenticated users can create blog posts"
ON blog_posts
FOR INSERT
TO public
WITH CHECK (auth.uid() = author_id);