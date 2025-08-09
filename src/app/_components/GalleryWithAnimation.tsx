"use client";

import React, { useEffect, useState } from "react";
import Masonry from "./animated-components/masonry-orig";
import { useFirebaseImages } from "@/hooks/useFirebaseImages";
import { FirebaseImage } from "@/lib/storage";




function GalleryWithAnimation({ serverImages }: { serverImages: FirebaseImage[] }) {
  // const { images, loading, error } = useFirebaseImages();

  // Generate deterministic heights based on index
  const generateHeight = (index: number): number => {
    const seed = (index * 37 + 23) % 100;
    return 250 + Math.floor((seed / 100) * 400);
  };

  const [masonryItems, setMasonryItems] = useState<any[]>([]);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    if (serverImages.length > 0) {
      // Convert Firebase images to Masonry format with deterministic heights
      const items = serverImages.map((img, index) => ({
        id: img.id,
        img: img.url,
        url: img.url,
        height: generateHeight(index),
      }));
      setMasonryItems(items);
      // Give some time for layout calculation
      setTimeout(() => setIsLayoutReady(true), 100);
    } else if (serverImages.length === 0) {
      // Fallback items
      const fallbackItems = [
        {
          id: "1",
          img: "https://picsum.photos/id/1015/600/900?grayscale",
          url: "https://example.com/one",
          height: 400,
        },
        {
          id: "2",
          img: "https://picsum.photos/id/1011/600/750?grayscale",
          url: "https://example.com/two",
          height: 250,
        },
        {
          id: "3",
          img: "https://picsum.photos/id/1020/600/800?grayscale",
          url: "https://example.com/three",
          height: 600,
        },
      ];
      setMasonryItems(fallbackItems);
      // setTimeout(() => setShowGallery(true), 300);
    }
  }, [serverImages]);

  if (serverImages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">Error: No images found</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[800px]" style={{ minHeight: masonryItems.length > 0 ? '800px' : '400px' }}>
      <div className="animate-in fade-in duration-1000 ease-out">
        <Masonry
          items={masonryItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={true}
        />
      </div>
    </div>
  );
}

export default GalleryWithAnimation;
