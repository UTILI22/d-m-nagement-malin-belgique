
-- Create storage bucket for quote photos
INSERT INTO storage.buckets (id, name, public) VALUES ('quote-photos', 'quote-photos', true);

-- Allow anyone to upload to quote-photos bucket
CREATE POLICY "Anyone can upload quote photos"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'quote-photos');

-- Allow anyone to read quote photos (public bucket)
CREATE POLICY "Anyone can read quote photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'quote-photos');

-- Allow admins to delete quote photos
CREATE POLICY "Admins can delete quote photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'));

-- Add photo_urls column to quotes table
ALTER TABLE public.quotes ADD COLUMN photo_urls text[] DEFAULT '{}';
