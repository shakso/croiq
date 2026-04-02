/*
  # Fix auth schema and user setup

  1. Changes
    - Drop existing admin user if exists to prevent conflicts
    - Create admin user with proper schema configuration
    - Set up auth identities properly
*/

-- First, clean up any existing failed attempts
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
    is_super_admin,
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
    jsonb_build_object('provider', 'email', 'providers', array['email']),
    jsonb_build_object(),
    'authenticated',
    'authenticated',
    '',
    '',
    '',
    '',
    false,
    now()
  );

  -- Create identity for the user
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