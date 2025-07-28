import { NextResponse } from 'next/server';
import { getGalleryImages, getImagesByCategory } from '@/lib/storage';

// Required for static export
export const dynamic = 'force-static';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let images;
    if (category) {
      images = await getImagesByCategory(category);
    } else {
      images = await getGalleryImages();
    }

    // Apply pagination if limit is specified
    const startIndex = offset;
    const endIndex = startIndex + limit;
    const paginatedImages = images.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      images: paginatedImages,
      count: paginatedImages.length,
      total: images.length,
      hasMore: endIndex < images.length,
      nextOffset: endIndex < images.length ? endIndex : null,
    });
  } catch (error) {
    console.error('Error fetching images from Firebase:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch images',
        images: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { folderPath } = await request.json();
    
    if (!folderPath) {
      return NextResponse.json(
        { success: false, error: 'folderPath is required' },
        { status: 400 }
      );
    }

    const images = await getImagesByCategory(folderPath);
    
    return NextResponse.json({
      success: true,
      images,
      count: images.length,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch images',
        images: [],
      },
      { status: 500 }
    );
  }
}
