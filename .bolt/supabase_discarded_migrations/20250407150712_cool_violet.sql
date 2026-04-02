/*
  # Fix auth schema permissions

  1. Changes
    - Grant necessary permissions on auth schema to authenticated and anon roles
    - Ensure proper access control for authentication
*/

-- Grant usage on auth schema
GRANT USAGE ON SCHEMA auth TO anon, authenticated;

-- Grant access to auth.users for the auth API
GRANT SELECT ON auth.users TO anon, authenticated;
GRANT SELECT ON auth.refresh_tokens TO anon, authenticated;

-- Ensure proper schema search path
ALTER ROLE anon SET search_path TO public, auth;
ALTER ROLE authenticated SET search_path TO public, auth;