import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Clear existing data safely
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const categories = [
      'الأدوية الموصوفة',
      'مسكنات الألم',
      'أدوية البرد والزكام',
      'الفيتامينات والمكملات',
      'العناية بالبشرة',
      'العناية بالشعر',
      'العناية بالطفل',
      'مستلزمات طبية',
      'العناية الشخصية'
    ];

    for (const name of categories) {
      await prisma.category.create({
        data: { name }
      });
    }

    return NextResponse.json({ message: 'تم إعادة تهيئة قاعدة البيانات بنجاح وإضافة الأقسام الأساسية.' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تحديث قاعدة البيانات' }, { status: 500 });
  }
}
