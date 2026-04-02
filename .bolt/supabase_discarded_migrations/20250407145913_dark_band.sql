/*
  # Create admin user for blog management

  1. Changes
    - Create admin user with email steve@croiq.com
    - Set up authentication identity
*/

DO $$
DECLARE
  admin_user_id uuid := gen_random_uuid();
BEGIN
  -- Create the admin user with a secure password
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
    email_change_token_new
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
    ''
  );

  -- Create identity for the user
  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    provider,
    identity_data,
    created_at,
    updated_at
  )
  VALUES (
    admin_user_id,
    admin_user_id,
    'steve@croiq.com',
    'email',
    jsonb_build_object('sub', admin_user_id::text, 'email', 'steve@croiq.com'),
    now(),
    now()
  );
END $$;