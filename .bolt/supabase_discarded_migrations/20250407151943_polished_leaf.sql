/*
  # Fix authentication permissions

  1. Changes
    - Grant proper permissions on auth schema and tables
    - Ensure correct search path for roles
    - Add necessary sequence permissions
*/

-- Revoke existing permissions to start fresh
REVOKE ALL ON ALL TABLES IN SCHEMA auth FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA auth FROM anon, authenticated;
REVOKE ALL ON ALL ROUTINES IN SCHEMA auth FROM anon, authenticated;
REVOKE USAGE ON SCHEMA auth FROM anon, authenticated;

-- Grant minimal required permissions
GRANT USAGE ON SCHEMA auth TO anon, authenticated;

-- Grant specific table permissions
GRANT SELECT ON auth.users TO anon, authenticated;
GRANT SELECT ON auth.refresh_tokens TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON auth.users TO authenticated;
GRANT SELECT, INSERT, UPDATE ON auth.refresh_tokens TO authenticated;

-- Grant sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA auth TO authenticated;

-- Set search path
ALTER ROLE anon SET search_path TO public, auth;
ALTER ROLE authenticated SET search_path TO public, auth;