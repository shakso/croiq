/*
  # Fix auth schema and user setup

  1. Changes
    - Drop existing user to avoid conflicts
    - Create admin user with correct schema structure
    - Set up proper auth identities
*/

-- First, clean up any existing data
DO $$
BEGIN
  DELETE FROM auth.identities WHERE provider_id = 'steve@croiq.com';
  DELETE FROM auth.users WHERE email = 'steve@croiq.com';
END $$;

-- Create the admin user with proper schema
DO $$
DECLARE
  admin_user_id uuid := gen_random_uuid();
BEGIN
  -- Create the admin user
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role,
    confirmation_token,
    recovery_token,
    email_change_token_current,
    email_change_token_new,
    last_sign_in_at
  )
  VALUES (
    admin_user_id,
    '00000000-0000-0000-0000-000000000000',
    'steve@croiq.com',
    crypt('CROiq2024!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    'authenticated',
    'authenticated',
    '',
    '',
    '',
    '',
    now()
  );

  -- Create identity record
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    created_at,
    updated_at,
    last_sign_in_at
  )
  VALUES (
    admin_user_id,
    admin_user_id,
    jsonb_build_object(
      'sub', admin_user_id::text,
      'email', 'steve@croiq.com'
    ),
    'email',
    'steve@croiq.com',
    now(),
    now(),
    now()
  );
END $$;