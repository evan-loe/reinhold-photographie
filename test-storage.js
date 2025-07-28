// Test Firebase Storage access
import { storage } from './src/lib/firebase.ts';
import { ref, listAll } from 'firebase/storage';

async function testStorageAccess() {
  try {
    console.log('Testing Firebase Storage access...');
    
    // Test gallerie folder
    const gallerieRef = ref(storage, 'gallerie');
    const gallerieResult = await listAll(gallerieRef);
    console.log(`✅ Gallerie folder access: ${gallerieResult.items.length} items found`);
    
    // Test gallery folder (fallback)
    const galleryRef = ref(storage, 'gallery');
    const galleryResult = await listAll(galleryRef);
    console.log(`✅ Gallery folder access: ${galleryResult.items.length} items found`);
    
  } catch (error) {
    console.error('❌ Storage access error:', error);
    console.log('👉 Please check Firebase Storage rules');
  }
}

testStorageAccess();
