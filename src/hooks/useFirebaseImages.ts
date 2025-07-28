import { useState, useEffect } from 'react';
import { FirebaseImage } from '@/lib/storage';

interface UseFirebaseImagesResult {
  images: FirebaseImage[];
  loading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

export function useFirebaseImages(category?: string): UseFirebaseImagesResult {
  const [images, setImages] = useState<FirebaseImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = category ? `/api/images?category=${category}` : '/api/images';
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
      if (data.success) {
        setImages(data.images);
        setTotal(data.total || data.images.length);
      } else {
        setError(data.error || 'Failed to fetch images');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [category]);

  return {
    images,
    loading,
    error,
    total,
    refetch: fetchImages,
  };
}
