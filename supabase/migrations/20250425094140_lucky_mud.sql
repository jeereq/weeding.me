/*
  # Template Images Management

  1. New Tables
    - template_images
      - id (uuid, primary key)
      - template_id (uuid, references templates)
      - url (text)
      - filename (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for admin and editor access
*/

CREATE TABLE template_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES templates NOT NULL,
  url text NOT NULL,
  filename text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE template_images ENABLE ROW LEVEL SECURITY;

-- Policies for template images
CREATE POLICY "Admins can manage template images"
  ON template_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Editors can view template images"
  ON template_images
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM template_access
      WHERE template_id = template_images.template_id
      AND user_id = auth.uid()
    )
  );