import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// منع Next.js من تخزين هذه الصفحة مؤقتاً (مهم جداً لـ Vercel)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = [
      'أجهزة قياس الضغط',
      'أجهزة قياس السكر',
      'علاجات السكري',
      'مستلزمات الشعر',
      'الأحزمة الطبية',
      'كبار السن',
      'الأطفال',
      'الفيتامينات',
      'العناية بالبشرة',
      'العناية بالحوامل',
      'أجهزة التدليك',
      'ارسال وصفة طبية واستشارات',
      'علاجات الضغط',
      'علاجات التنفس',
      'علاجات القلب',
      'الفوارات',
      'المراهم',
      'العناية بالأسنان',
      'أصناف شركة NOW',
      'شركة بيوبلانس (BioBalance)',
      'شركة بيودرما (Bioderma)',
      'شركة ديرما (Derma)',
      'منتجات إزالة الشعر النسائية',
      'العناية بالجهاز الهضمي'
    ];

    let addedCount = 0;

    for (const name of categories) {
      // التحقق مما إذا كان القسم موجوداً بالفعل لتجنب التكرار
      const existing = await prisma.category.findFirst({
        where: { name }
      });

      if (!existing) {
        await prisma.category.create({
          data: { name }
        });
        addedCount++;
      }
    }

    return NextResponse.json({ 
      message: 'تمت العملية بأمان.', 
      added_categories: addedCount 
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تحديث قاعدة البيانات' }, { status: 500 });
  }
}
