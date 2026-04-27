"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/upload";


export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageFile = formData.get("image") as File;
  const categoryId = formData.get("categoryId") as string;
  const newCategoryName = formData.get("newCategoryName") as string;
  
  if (!name || !price || (!categoryId && !newCategoryName)) {
    throw new Error("Missing required fields");
  }

  let finalCategoryId = categoryId;

  if (newCategoryName) {
    const category = await prisma.category.create({
      data: { name: newCategoryName }
    });
    finalCategoryId = category.id;
  }

  let imageUrl = "/products/bp-monitor.jpg";
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile);
  }


  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image: imageUrl,
      categoryId: finalCategoryId
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

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageFile = formData.get("image") as File;
  const categoryId = formData.get("categoryId") as string;

  const updateData: any = {
    name,
    description,
    price,
    categoryId
  };

  if (imageFile && imageFile.size > 0) {
    updateData.image = await uploadImage(imageFile);
  }

  await prisma.product.update({
    where: { id },
    data: updateData
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");

  return { success: true };
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function deleteCategory(id: string) {
  // Check if category has products
  const productsCount = await prisma.product.count({
    where: { categoryId: id }
  });

  if (productsCount > 0) {
    throw new Error("لا يمكن حذف القسم لأنه يحتوي على منتجات");
  }

  await prisma.category.delete({
    where: { id }
  });

  revalidatePath("/admin/categories");
  return { success: true };
}

