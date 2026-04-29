import { supabase } from './supabase';

export async function uploadImage(file: File): Promise<string> {
  // إنشاء اسم فريد للملف
  const extension = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
  const filePath = `uploads/${filename}`;

  // رفع الملف إلى Supabase Storage
  const { data, error } = await supabase.storage
    .from('pharmacy') // تأكد من إنشاء Bucket بهذا الاسم في Supabase وجعله Public
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image to Supabase:', error);
    throw new Error('فشل في رفع الصورة');
  }

  // الحصول على الرابط العام للصورة
  const { data: { publicUrl } } = supabase.storage
    .from('pharmacy')
    .getPublicUrl(filePath);

  return publicUrl;
}
