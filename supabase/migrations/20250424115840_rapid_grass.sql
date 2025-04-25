/*
  # Initial Schema Setup for InviteVite

  1. New Tables
    - users (managed by Supabase Auth)
    - templates
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - category (text)
      - style (text)
      - image_url (text)
      - created_at (timestamp)
    - invitations
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - template_id (uuid, references templates)
      - title (text)
      - event_date (timestamp)
      - customizations (jsonb)
      - status (text)
      - created_at (timestamp)
    - guests
      - id (uuid, primary key)
      - invitation_id (uuid, references invitations)
      - name (text)
      - email (text)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Create templates table
CREATE TABLE templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  style text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create invitations table
CREATE TABLE invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  template_id uuid REFERENCES templates NOT NULL,
  title text NOT NULL,
  event_date timestamptz,
  customizations jsonb DEFAULT '{}',
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now()
);

-- Create guests table
CREATE TABLE guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id uuid REFERENCES invitations NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Templates are viewable by everyone"
  ON templates
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage their own invitations"
  ON invitations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage guests for their invitations"
  ON guests
  FOR ALL
  TO authenticated
  USING (
    invitation_id IN (
      SELECT id FROM invitations WHERE user_id = auth.uid()
    )
  );