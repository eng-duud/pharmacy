import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding default categories safely...');
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