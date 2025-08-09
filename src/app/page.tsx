import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import GalleryWithAnimation from "@/app/_components/GalleryWithAnimation";
import { getImagesFromStorage } from "@/lib/storage";
import { Footer } from "../app/_components/footer"

export default async function Index() {
  // Get images server-side for SSR
  const serverImages = await getImagesFromStorage();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center px-8 md:px-24 flex-1">
          <GalleryWithAnimation serverImages={serverImages} />
      </main>
      <Footer />
    </div>
  );
}
