import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Clear existing data safely
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    return NextResponse.json({ message: 'تم تنظيف قاعدة البيانات بنجاح! قاعدة البيانات الآن فارغة.' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تحديث قاعدة البيانات' }, { status: 500 });
  }
}
