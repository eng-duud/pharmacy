import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // حذف البيانات بترتيب معين لتجنب مشاكل الربط (Foreign Key Constraints)
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    return NextResponse.json({ message: 'تم تفريغ قاعدة البيانات بنجاح!' });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء التنظيف' }, { status: 500 });
  }
}
