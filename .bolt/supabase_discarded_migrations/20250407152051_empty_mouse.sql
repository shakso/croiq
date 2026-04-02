/*
  # Grant auth schema permissions to anonymous users

  1. Changes
    - Grant usage on auth schema to anon role
    - Grant select permissions on auth.users to anon role
    - Grant execute on auth functions to anon role

  2. Security
    - Carefully scoped permissions to only what's needed for authentication
    - Read-only access to required auth tables
*/

-- Grant usage on auth schema
GRANT USAGE ON SCHEMA auth TO anon;

-- Grant select on auth.users
GRANT SELECT ON auth.users TO anon;

-- Grant execute on auth functions
GRANT EXECUTE ON FUNCTION auth.email() TO anon;
GRANT EXECUTE ON FUNCTION auth.uid() TO anon;
GRANT EXECUTE ON FUNCTION auth.role() TO anon;
GRANT EXECUTE ON FUNCTION auth.jwt() TO anon;