"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/upload";

async function generateProductId(): Promise<string> {
  const date = new Date();
  const dd = date.getDate().toString().padStart(2, '0');
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const yy = date.getFullYear().toString().slice(-2);
  const prefix = `PRD-${dd}${mm}${yy}`;

  // Count products created today to get sequential number
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const todayCount = await prisma.product.count({
    where: { createdAt: { gte: startOfDay, lte: endOfDay } },
  });

  const seq = (todayCount + 1).toString().padStart(4, '0');
  return `${prefix}-${seq}`;
}

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageFile = formData.get("image") as File;
  const categoryId = formData.get("categoryId") as string;
  const newCategoryName = formData.get("newCategoryName") as string;
  const isNew = formData.get("isNew") === "true";

  let imageUrl = "/products/default.jpg";
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile);
  }

  if (!name || isNaN(price) || (!categoryId && !newCategoryName)) {
    throw new Error("Missing required fields");
  }

  let finalCategoryId = categoryId;

  if (newCategoryName) {
    const category = await prisma.category.create({
      data: { name: newCategoryName },
    });
    finalCategoryId = category.id;
  }

  const productId = await generateProductId();
  const product = await prisma.product.create({
    data: {
      id: productId,
      name,
      description,
      price,
      image: imageUrl,
      categoryId: finalCategoryId,
      isNew,
    },
  });

  revalidatePath("/adcpanforpharmacyquds/products");
  revalidatePath("/products");

  return { success: true, product };
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/adcpanforpharmacyquds/products");
    revalidatePath("/products");

    return { success: true };
  } catch (error: any) {
    console.error("Delete product error:", error);
    return { 
      success: false, 
      error: "حدث خطأ أثناء حذف الدواء من قاعدة البيانات" 
    };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("categoryId") as string;
  const imageFile = formData.get("image") as File;
  const isNew = formData.get("isNew") === "true";

  const updateData: Record<string, unknown> = {
    name,
    description,
    price,
    categoryId,
    isNew,
  };

  if (imageFile && imageFile.size > 0) {
    updateData.image = await uploadImage(imageFile);
  }

  await prisma.product.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/adcpanforpharmacyquds/products");
  revalidatePath("/products");

  return { success: true };
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function deleteCategory(id: string) {
  try {
    const productsCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      return { 
        success: false, 
        error: "لا يمكن حذف الصنف لأنه يحتوي على أدوية. قم بحذف الأدوية أو نقلها أولاً." 
      };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/adcpanforpharmacyquds/categories");
    return { success: true };
  } catch (error) {
    console.error("Delete category error:", error);
    return { 
      success: false, 
      error: "حدث خطأ أثناء حذف الصنف" 
    };
  }
}
