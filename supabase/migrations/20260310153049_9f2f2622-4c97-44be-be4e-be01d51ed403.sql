
-- Storage uploads (especially multipart) need UPDATE policy too
CREATE POLICY "Anyone can update quote photos"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'quote-photos')
WITH CHECK (bucket_id = 'quote-photos');
