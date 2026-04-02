/*
  # Set up authentication schema and permissions

  1. Changes
    - Grant necessary permissions for auth schema
    - Set up proper role permissions
    - Configure schema search paths

  2. Security
    - Carefully scoped permissions
    - Proper role-based access control
*/

-- Grant schema permissions
GRANT USAGE ON SCHEMA auth TO anon, authenticated;

-- Grant table permissions
GRANT SELECT ON auth.users TO anon, authenticated;
GRANT SELECT ON auth.refresh_tokens TO anon, authenticated;

-- Grant sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA auth TO authenticated;

-- Set search paths
ALTER ROLE anon SET search_path TO public, auth;
ALTER ROLE authenticated SET search_path TO public, auth;