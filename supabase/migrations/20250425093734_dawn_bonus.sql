/*
  # Templates Management and Access Control

  1. New Tables
    - template_categories
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - created_at (timestamptz)

    - template_access
      - id (uuid, primary key)
      - template_id (uuid, references templates)
      - user_id (uuid, references auth.users)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin and editor access
*/

-- Create template categories table
CREATE TABLE template_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create template access table
CREATE TABLE template_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES templates NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(template_id, user_id)
);

-- Add category reference to templates
ALTER TABLE templates ADD COLUMN category_id uuid REFERENCES template_categories;

-- Enable RLS
ALTER TABLE template_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_access ENABLE ROW LEVEL SECURITY;

-- Policies for template categories
CREATE POLICY "Admins can manage template categories"
  ON template_categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Everyone can view template categories"
  ON template_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for template access
CREATE POLICY "Admins can manage template access"
  ON template_access
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Users can view their template access"
  ON template_access
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Update templates policies
CREATE POLICY "Editors can access assigned templates"
  ON templates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    ) OR
    EXISTS (
      SELECT 1 FROM template_access
      WHERE template_id = templates.id
      AND user_id = auth.uid()
    )
  );