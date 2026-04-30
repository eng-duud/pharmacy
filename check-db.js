const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.findMany({ include: { category: true } })
  const categories = await prisma.category.findMany()
  console.log("Total Products:", products.length)
  console.log("Total Categories:", categories.length)
  console.log("Sample Product:", products[0])
  console.log("Sample Category:", categories[0])
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
