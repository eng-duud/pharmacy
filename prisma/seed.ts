import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding default categories safely...');
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
  console.log(`Successfully added ${addedCount} missing categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });