/*
  # Fix auth schema columns and handling

  1. Changes
    - Ensure email_change column is properly nullable
    - Add proper constraints and defaults
    - Update column definitions to handle NULL values correctly
*/

-- Ensure auth.users has correct column definitions
DO $$
BEGIN
  -- Modify email_change column to handle NULL properly
  ALTER TABLE auth.users 
    ALTER COLUMN email_change DROP NOT NULL,
    ALTER COLUMN email_change SET DEFAULT NULL;

  -- Ensure other email-related columns are properly nullable
  ALTER TABLE auth.users 
    ALTER COLUMN email_change_token_new DROP NOT NULL,
    ALTER COLUMN email_change_token_new SET DEFAULT NULL;

  ALTER TABLE auth.users 
    ALTER COLUMN email_change_token_current DROP NOT NULL,
    ALTER COLUMN email_change_token_current SET DEFAULT NULL;

  -- Set proper default for confirm status
  ALTER TABLE auth.users 
    ALTER COLUMN email_change_confirm_status SET DEFAULT 0;

  -- Update any existing NULL string values to actual NULL
  UPDATE auth.users 
  SET 
    email_change = NULL 
  WHERE 
    email_change = 'NULL' 
    OR email_change = '';

  UPDATE auth.users 
  SET 
    email_change_token_new = NULL 
  WHERE 
    email_change_token_new = 'NULL' 
    OR email_change_token_new = '';

  UPDATE auth.users 
  SET 
    email_change_token_current = NULL 
  WHERE 
    email_change_token_current = 'NULL' 
    OR email_change_token_current = '';
END $$;