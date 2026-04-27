import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Clear existing data safely
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const categoriesList = [
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
      'إرسال وصفة طبية واستشارات',
      'علاجات الضغط',
      'علاجات التنفس',
      'علاجات القلب',
      'الفوارات',
      'المراهم',
      'العناية بالأسنان',
      'اصناف شركه now',
      'شركة بيوبلانس',
      'شركه بيودرما',
      'شركه ديرما',
      'منتجات ازاله الشعر النسائيه',
      'العنايه بالجهاز الهضمي'
    ];

    for (const catName of categoriesList) {
      await prisma.category.create({
        data: { name: catName },
      });
    }

    return NextResponse.json({ message: 'تم تحديث الأقسام بنجاح! يمكنك الآن العودة للموقع.' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تحديث قاعدة البيانات' }, { status: 500 });
  }
}
