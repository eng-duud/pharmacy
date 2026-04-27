import prisma from "@/lib/prisma";
import ProductsClient from "@/components/ProductsClient";
import { MOCK_PRODUCTS } from "@/constants";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // Fetch real products from DB
  const dbProductsRaw = await prisma.product.findMany({
    include: { category: true }
  });

  // Map them to match the expected format
  const dbProducts = dbProductsRaw.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category.name,
    brand: "القدس", // Default for now
    price: p.price,
    image: p.image || "/placeholder.png",
  }));

  // Combine real DB products and MOCK products for presentation
  const combinedProducts = [...dbProducts, ...MOCK_PRODUCTS];

  return <ProductsClient initialProducts={combinedProducts} />;
}
