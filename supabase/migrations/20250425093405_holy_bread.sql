/*
  # User Roles and Management System

  1. New Tables
    - user_roles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - role (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on user_roles table
    - Add policies for admin access
*/

CREATE TYPE user_role AS ENUM ('admin', 'editor');

CREATE TABLE user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role user_role NOT NULL DEFAULT 'editor',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Only admins can manage user roles
CREATE POLICY "Admins can manage user roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Everyone can view their own role
CREATE POLICY "Users can view their own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());