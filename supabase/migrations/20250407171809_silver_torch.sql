/*
  # Create blog posts table and policies

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `image_url` (text, optional)
      - `author_id` (uuid, references auth.users)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policies for:
      - Anyone can read posts
      - Authenticated users can create posts
      - Authors can update and delete their own posts
*/

-- Create the blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    image_url text,
    author_id uuid REFERENCES auth.users(id) NOT NULL,
    created_at timestamptz DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at timestamptz DEFAULT (now() AT TIME ZONE 'UTC')
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can read blog posts" ON public.blog_posts;
    DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON public.blog_posts;
    DROP POLICY IF EXISTS "Authors can update their own posts" ON public.blog_posts;
    DROP POLICY IF EXISTS "Authors can delete their own posts" ON public.blog_posts;
EXCEPTION
    WHEN undefined_object THEN
        NULL;
END $$;

-- Create policies
CREATE POLICY "Anyone can read blog posts"
    ON public.blog_posts
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create blog posts"
    ON public.blog_posts
    FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts"
    ON public.blog_posts
    FOR UPDATE
    USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts"
    ON public.blog_posts
    FOR DELETE
    USING (auth.uid() = author_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = (now() AT TIME ZONE 'UTC');
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();