/*
  # Fix auth schema and permissions

  1. Changes
    - Grant necessary permissions for auth schema
    - Ensure proper column types for auth.users table
    - Set up correct search paths
*/

-- Reset permissions
REVOKE ALL ON ALL TABLES IN SCHEMA auth FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA auth FROM anon, authenticated;
REVOKE ALL ON ALL ROUTINES IN SCHEMA auth FROM anon, authenticated;
REVOKE USAGE ON SCHEMA auth FROM anon, authenticated;

-- Grant basic schema access
GRANT USAGE ON SCHEMA auth TO anon, authenticated;

-- Grant specific table permissions
GRANT SELECT ON auth.users TO anon, authenticated;
GRANT SELECT ON auth.refresh_tokens TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON auth.users TO authenticated;
GRANT SELECT, INSERT, UPDATE ON auth.refresh_tokens TO authenticated;

-- Grant sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA auth TO authenticated;

-- Set search paths
ALTER ROLE anon SET search_path TO public, auth;
ALTER ROLE authenticated SET search_path TO public, auth;

-- Ensure auth.users has correct columns
DO $$
BEGIN
  -- Add email_change column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'email_change'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS email_change text;
  END IF;

  -- Add email_change_token_new column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'email_change_token_new'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS email_change_token_new text;
  END IF;

  -- Add email_change_token_current column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'email_change_token_current'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS email_change_token_current text;
  END IF;

  -- Add email_change_confirm_status column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'email_change_confirm_status'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS email_change_confirm_status smallint DEFAULT 0;
  END IF;
END $$;