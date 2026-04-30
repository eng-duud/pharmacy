import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
      const existing = await prisma.category.findFirst({ where: { name } });
      if (!existing) {
        await prisma.category.create({ data: { name } });
        addedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `تم إضافة ${addedCount} قسم بنجاح إلى قاعدة البيانات!` 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
