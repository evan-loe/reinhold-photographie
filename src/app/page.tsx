import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import GalleryWithAnimation from "@/app/_components/GalleryWithAnimation";
import { getImagesFromStorage } from "@/lib/storage";

export default async function Index() {
  // Get images server-side for SSR
  const serverImages = await getImagesFromStorage();

  return (
    <main>
      <Container>
        <Intro />
        <GalleryWithAnimation serverImages={serverImages} />
      </Container>
    </main>
  );
}
