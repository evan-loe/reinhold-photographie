import React, {
  use,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

// Type definitions
interface MasonryItem {
  id: string;
  img: string;
  height: number;
  url?: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
} from "@/app/_components/animated-components/dialog";
import { Skeleton } from "./skeleton";

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const get = () => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return defaultValue;
    }
    return values[queries.findIndex((q) => window.matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return;
    }
    const handler = () => setValue(get);
    queries.forEach((q) => window.matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        window.matchMedia(q).removeEventListener("change", handler)
      );
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

// const preloadImages = async (urls: string[]): Promise<void> => {
//   await Promise.all(
//     urls.map(
//       (src) =>
//         new Promise<void>((resolve) => {
//           const img = new Image();
//           img.src = src;
//           img.onload = img.onerror = () => resolve();
//         })
//     )
//   );
// };

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();

  const [loadedImages, setLoadedImages] = useState(new Set<string>());

  useEffect(() => {
    if (items.length === 0) return;

    // const imageUrls = items.map((item) => item.img);
    // preloadImages(imageUrls).then(() => {
    //   setLoadedImages(new Set(imageUrls));
    // });
  }, [items]);

  const getInitialPosition = (item: any) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"];
      direction = dirs[
        Math.floor(Math.random() * dirs.length)
      ] as typeof animateFrom;
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  const grid = useMemo((): { items: GridItem[], height: number } => {
    if (!width) return { items: [], height: 0 };
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const gridItems = items.map((child: MasonryItem): GridItem => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 1.5;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    // Calculate the total height needed
    const maxHeight = Math.max(...colHeights);
    
    return { items: gridItems, height: maxHeight };
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {

    grid.items.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [grid, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
    console.log(`Image ${id} loaded.`);
    console.log(`Image ${id} loaded and blurred effect removed.`);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ height: grid.height || 'auto' }}>
      {grid.items.map((item) => (
        <Dialog key={item.id}>
          <DialogTrigger asChild>
            <div
              key={item.id}
              data-key={item.id}
              className="absolute box-content"
              style={{ willChange: "transform, width, height, opacity" }}
              onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
            >
              {loadedImages.has(item.id) && (
                <div 
                  className="absolute inset-0 bg-cover bg-top rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
              )}
              {!loadedImages.has(item.id) && (
                <Skeleton className="absolute inset-0 rounded-[10px]"/>
              )}
              <img src={item.img} loading="eager" className="hidden" alt="" onLoad={() => handleImageLoad(item.id)} />
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-gray-800 to-gray-200/50 opacity-0 pointer-events-none" />
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[98vw] max-h-[98vh] sm:max-w-[95vw] sm:max-h-[95vh] w-auto h-auto p-0 bg-transparent border-0 shadow-none">
            <img
              src={item.img}
              alt={`Gallery image ${item.id}`}
              loading="eager"
              className="max-w-full max-h-full object-contain rounded-lg"
              onLoad={(e) => {
                const img = e.currentTarget;
                const isPortrait = img.naturalHeight > img.naturalWidth;
                if (isPortrait) {
                  img.style.objectPosition = 'center top';
                } else {
                  img.style.objectPosition = 'center center';
                }
              }}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default Masonry;
