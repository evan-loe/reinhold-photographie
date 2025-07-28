import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { getImagesFromStorage, getImagesByCategory, FirebaseImage } from "./storage";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// Firebase Storage API functions
export async function getGalleryImages(): Promise<FirebaseImage[]> {
  return await getImagesFromStorage('gallery');
}

export async function getImagesByFolder(folderName: string): Promise<FirebaseImage[]> {
  return await getImagesByCategory(folderName);
}

// Combined function to get images from both local and Firebase
export async function getAllImages(): Promise<{ src: string; height: number; id: string }[]> {
  try {
    const firebaseImages = await getGalleryImages();
    
    // Convert Firebase images to the format expected by your gallery
    return firebaseImages.map((img, index) => ({
      src: img.url,
      height: 300 + Math.floor(Math.random() * 200), // Random height between 300-500px
      id: img.id || `firebase-${index}`,
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    // Fallback to placeholder images if Firebase fails
    return [
      { src: "https://picsum.photos/id/1/300/300", height: 300, id: "fallback-1" },
      { src: "https://picsum.photos/id/10/300/400", height: 400, id: "fallback-2" },
      { src: "https://picsum.photos/id/100/300/250", height: 250, id: "fallback-3" },
    ];
  }
}

