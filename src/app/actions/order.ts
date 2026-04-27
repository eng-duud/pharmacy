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
        items: {
          create: data.items.map(item => ({
            // We ignore foreign key constraints if products are just mock data for now,
            // Wait, Prisma will enforce foreign key. 
            // We will conditionally skip if productId is mock, but it's better to just pass it.
            // If it fails because of mock product, we handle it gracefully.
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
