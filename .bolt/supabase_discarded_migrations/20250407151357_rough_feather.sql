/*
  # Fix authentication setup
  
  1. Changes
    - Grant necessary permissions for auth schema
    - Create test user with proper conflict handling
*/

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, anon, authenticated;

-- Create test user if not exists
DO $$
DECLARE
  user_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'test@example.com'
  ) INTO user_exists;
  
  IF NOT user_exists THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_token,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change_token_current,
      email_change_token_new
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'test@example.com',
      crypt('password123', gen_salt('bf')),
      NOW(),
      '',
      '{"provider":"email","providers":["email"]}',
      '{}',
      NOW(),
      NOW(),
      '',
      '',
      ''
    );
  END IF;
END $$;