
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Doors table
CREATE TABLE doors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  price_category TEXT NOT NULL,
  wood_type TEXT NOT NULL,
  style TEXT NOT NULL,
  origin TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  image_url TEXT NOT NULL,
  additional_images JSONB DEFAULT '[]'::JSONB,
  features JSONB DEFAULT '[]'::JSONB,
  details TEXT
);

-- Collections table
CREATE TABLE collections (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE
);

-- Testimonials table
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL,
  avatar_url TEXT NOT NULL
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE doors ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create access policies
CREATE POLICY "Public doors access" ON doors 
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Public collections access" ON collections 
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Public testimonials access" ON testimonials 
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Auth users can create contact submissions" ON contact_submissions 
  FOR INSERT TO authenticated WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX idx_doors_price_category ON doors(price_category);
CREATE INDEX idx_doors_style ON doors(style);
CREATE INDEX idx_doors_origin ON doors(origin);
CREATE INDEX idx_collections_featured ON collections(featured);
