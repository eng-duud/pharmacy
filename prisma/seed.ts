import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  console.log('Database cleared successfully.');

  console.log('Adding default categories...');
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
  console.log('Categories added successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });