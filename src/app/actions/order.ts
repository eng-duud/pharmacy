"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type OrderItemInput = {
  productId: string;
  quantity: number;
  price: number;
};

export async function createOrder(data: {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  totalAmount: number;
  items: OrderItemInput[];
}) {
  try {
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerAddress: data.customerAddress,
        totalAmount: data.totalAmount,
        type: "CART",
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin");

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "فشل في حفظ الطلب" };
  }
}

export async function createPrescriptionOrder(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const notes = formData.get("notes") as string;
    const imageFile = formData.get("image") as File;

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      const { uploadImage } = await import("@/lib/upload");
      imageUrl = await uploadImage(imageFile);
    }

    const order = await prisma.order.create({
      data: {
        customerName: name,
        customerPhone: phone,
        customerAddress: notes, // Store notes in address field for simplicity or use it for specific info
        type: "PRESCRIPTION",
        image: imageUrl,
        totalAmount: 0,
      }
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin");

    return { success: true, orderId: order.id, imageUrl };
  } catch (error) {
    console.error("Failed to create prescription:", error);
    return { success: false, error: "فشل في إرسال الوصفة" };
  }
}

