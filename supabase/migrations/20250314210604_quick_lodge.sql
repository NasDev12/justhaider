/*
  # Initial Schema Setup for Minecraft Server Listing

  1. New Tables
    - `servers`
      - Basic server information
      - Status tracking
      - Performance metrics
    - `users`
      - User profiles and roles
    - `server_votes`
      - Track user votes for servers
    
  2. Security
    - Enable RLS on all tables
    - Policies for different user roles
*/

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('user', 'helper', 'admin', 'owner');

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  role user_role DEFAULT 'user'::user_role,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  PRIMARY KEY (id)
);

-- Create servers table
CREATE TABLE IF NOT EXISTS public.servers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  ip text NOT NULL,
  port integer DEFAULT 25565,
  version text,
  description text,
  banner_url text,
  website_url text,
  discord_url text,
  status boolean DEFAULT false,
  players_online integer DEFAULT 0,
  max_players integer DEFAULT 0,
  uptime_percentage decimal DEFAULT 0,
  last_checked timestamptz DEFAULT now(),
  votes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES public.users(id)
);

-- Create server votes table
CREATE TABLE IF NOT EXISTS public.server_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id uuid REFERENCES public.servers(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(server_id, user_id)
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_votes ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can read all users" ON public.users
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND (role IS NULL OR role = 'user'::user_role));

-- Policies for servers
CREATE POLICY "Anyone can read servers" ON public.servers
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage servers" ON public.servers
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin'::user_role, 'owner'::user_role)
    )
  );

-- Policies for votes
CREATE POLICY "Anyone can read votes" ON public.server_votes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can vote" ON public.server_votes
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create helper functions
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS user_role
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT role FROM public.users WHERE id = user_id;
$$;