export const CATEGORIES = [
  "أجهزة قياس الضغط",
  "أجهزة قياس السكر",
  "علاجات السكري",
  "مستلزمات الشعر",
  "الأحزمة الطبية",
  "كبار السن",
  "الأطفال",
  "الفيتامينات",
  "العناية بالبشرة",
  "العناية بالحوامل",
  "أجهزة التدليك",
  "إرسال وصفة طبية واستشارات",
  "علاجات الضغط",
  "علاجات التنفس",
  "العناية",
  "علاجات القلب",
  "الفوارات",
  "المراهم",
  "العناية بالأسنان",
  "أصناف شركة NOW"
];

export const BRANDS = [
  "شركة بيوبلانس",
  "شركة بيودرما",
  "شركة ديرما"
];

export interface Product {
  id: number;
  name: string;
  category: string;
  brand?: string;
  price: number;
  image: string;
  isAvailable: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "جهاز قياس الضغط ديجيتال",
    category: "أجهزة قياس الضغط",
    price: 15000,
    image: "/products/bp-monitor.jpg",
    isAvailable: true
  },
  {
    id: 2,
    name: "فيتامين سي 1000 ملجم",
    category: "الفيتامينات",
    brand: "شركة بيوبلانس",
    price: 4500,
    image: "/products/vit-c.jpg",
    isAvailable: true
  },
  // Add more mock data as needed
];
