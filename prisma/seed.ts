import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

  console.log('Seeding categories...');

  for (const catName of categoriesList) {
    await prisma.category.create({
      data: { name: catName },
    });
  }

  console.log('Seed completed successfully. Database is now populated with requested categories.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
