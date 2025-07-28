import { storage } from './firebase';
import { ref, listAll, getDownloadURL, StorageReference } from 'firebase/storage';

export interface FirebaseImage {
  id: string;
  url: string;
  name: string;
  fullPath: string;
  size?: number;
  contentType?: string;
  metadata?: {
    timeCreated?: string;
    updated?: string;
  };
}

export interface PaginatedResult {
  images: FirebaseImage[];
  hasMore: boolean;
  nextPageToken?: string;
}

/**
 * Fetch all images from a specific folder in Firebase Storage
 */
export const getImagesFromStorage = async (folderPath: string = 'gallery'): Promise<FirebaseImage[]> => {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    
    const imagePromises = result.items.map(async (itemRef: StorageReference) => {
      const url = await getDownloadURL(itemRef);
      return {
        id: itemRef.name,
        url,
        name: itemRef.name,
        fullPath: itemRef.fullPath,
      };
    });
    
    return Promise.all(imagePromises);
  } catch (error) {
    console.error('Error fetching images from Firebase Storage:', error);
    return [];
  }
}

/**
 * Fetch images with pagination support
 */
export const getImagesWithPagination = async (
  folderPath: string = 'gallery',
  limit: number = 12,
  offset: number = 0
): Promise<PaginatedResult> => {
  try {
    const allImages = await getImagesFromStorage(folderPath);
    const startIndex = offset;
    const endIndex = startIndex + limit;
    const paginatedImages = allImages.slice(startIndex, endIndex);
    
    return {
      images: paginatedImages,
      hasMore: endIndex < allImages.length,
      nextPageToken: endIndex < allImages.length ? endIndex.toString() : undefined,
    };
  } catch (error) {
    console.error('Error fetching paginated images:', error);
    return {
      images: [],
      hasMore: false,
    };
  }
}

/**
 * Get images from specific subfolders
 */
export const getImagesByCategory = async (category: string): Promise<FirebaseImage[]> => {
  return getImagesFromStorage(`gallery/${category}`);
}

/**
 * Get gallery images (alias for backward compatibility)
 */
export const getGalleryImages = async (): Promise<FirebaseImage[]> => {
  return getImagesFromStorage('gallery');
}

/**
 * Get a single image by path
 */
export const getImageByPath = async (imagePath: string): Promise<string | null> => {
  try {
    const imageRef = ref(storage, imagePath);
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}
