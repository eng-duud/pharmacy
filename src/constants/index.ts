export const BRANDS = [
  "شركة بيوبلانس",
  "شركة بيودرما",
  "شركة ديرما"
];

export interface Product {
  id: string | number;
  name: string;
  category: string;
  brand?: string;
  price: number;
  image: string;
  isAvailable?: boolean;
}

