import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const extension = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  
  // Ensure directory exists
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    // Ignore if directory exists
  }

  const path = join(uploadDir, filename);
  await writeFile(path, buffer);
  
  return `/uploads/${filename}`;
}
