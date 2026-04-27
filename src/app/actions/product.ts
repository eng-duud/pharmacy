"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const image = formData.get("image") as string;
  const categoryName = formData.get("categoryName") as string;
  
  if (!name || !price || !categoryName) {
    throw new Error("Missing required fields");
  }

  let category = await prisma.category.findFirst({
    where: { name: categoryName }
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName }
    });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image: image || "/products/bp-monitor.jpg", // default image
      categoryId: category.id
    }
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  
  return { success: true, product };
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id }
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  
  return { success: true };
}
