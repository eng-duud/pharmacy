import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">إدارة الطلبات</h1>
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold dark:text-white">الطلبات الحديثة ({orders.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="p-4 font-medium">رقم الطلب</th>
                <th className="p-4 font-medium">العميل</th>
                <th className="p-4 font-medium">الهاتف</th>
                <th className="p-4 font-medium">العنوان</th>
                <th className="p-4 font-medium">المنتجات</th>
                <th className="p-4 font-medium">الإجمالي</th>
                <th className="p-4 font-medium">التاريخ</th>
                <th className="p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-500">{order.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-bold dark:text-white">{order.customerName}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300" dir="ltr">{order.customerPhone}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 max-w-[200px] truncate" title={order.customerAddress || ""}>
                    {order.customerAddress}
                  </td>
                  <td className="p-4">
                    <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400">
                      {order.items.map(item => (
                        <li key={item.id}>
                          {item.product ? item.product.name : "منتج مخصص"} (×{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 font-bold text-primary">{order.totalAmount} ريال</td>
                  <td className="p-4 text-slate-500">
                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: ar })}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500' :
                      order.status === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500'
                    }`}>
                      {order.status === 'PENDING' ? 'قيد الانتظار' : order.status === 'COMPLETED' ? 'مكتمل' : 'ملغي'}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">لا يوجد طلبات حالياً.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
