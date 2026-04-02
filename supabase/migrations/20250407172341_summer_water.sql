/*
  # Enable storage for blog images

  1. Changes
    - Create storage schema and enable storage features
    - Set up bucket for blog images
    - Configure storage permissions and policies
*/

-- Create storage schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS storage;

-- Create storage tables
CREATE TABLE IF NOT EXISTS storage.buckets (
    id text PRIMARY KEY,
    name text NOT NULL,
    owner uuid REFERENCES auth.users,
    created_at timestamptz DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at timestamptz DEFAULT (now() AT TIME ZONE 'UTC'),
    public boolean DEFAULT FALSE,
    avif_autodetection boolean DEFAULT FALSE,
    file_size_limit bigint,
    allowed_mime_types text[]
);

CREATE TABLE IF NOT EXISTS storage.objects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    bucket_id text REFERENCES storage.buckets(id),
    name text NOT NULL,
    owner uuid REFERENCES auth.users,
    created_at timestamptz DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at timestamptz DEFAULT (now() AT TIME ZONE 'UTC'),
    last_accessed_at timestamptz DEFAULT (now() AT TIME ZONE 'UTC'),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/')) STORED,
    version text
);

-- Set up RLS
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create the blog-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for storage.buckets
CREATE POLICY "Public Access"
ON storage.buckets FOR SELECT
TO public
USING (true);

-- Policies for storage.objects
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (auth.uid() = owner)
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (auth.uid() = owner AND bucket_id = 'blog-images');

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON SCHEMA storage TO postgres, authenticated, anon;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA storage TO postgres, authenticated, anon;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA storage TO postgres, authenticated, anon;