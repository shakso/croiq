/*
  # Fix blog posts RLS policies

  1. Changes
    - Drop and recreate INSERT policy to ensure author_id is properly handled
    - Ensure policies use proper column references

  2. Security
    - Maintain existing security model but fix policy implementation
    - Keep RLS enabled
*/

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON blog_posts;

-- Recreate INSERT policy with proper column references
CREATE POLICY "Authenticated users can create blog posts"
ON blog_posts
FOR INSERT
TO public
WITH CHECK (
  auth.uid() = author_id
);