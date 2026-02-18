
-- Create quotes table for storing quote requests
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  departure TEXT NOT NULL,
  arrival TEXT NOT NULL,
  property_from TEXT,
  property_to TEXT,
  move_date DATE,
  photos_count INTEGER DEFAULT 0,
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit a quote" ON public.quotes FOR INSERT WITH CHECK (true);

-- Only authenticated users can view quotes (for admin dashboard later)
CREATE POLICY "Authenticated users can view quotes" ON public.quotes FOR SELECT USING (auth.role() = 'authenticated');
