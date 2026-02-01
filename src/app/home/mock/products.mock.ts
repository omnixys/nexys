/**
 * @file products.mock.ts
 * @description Mock products for Products shelf (i18n-ready)
 */

import type { ProductTranslationKey } from "@/i18n/productKeys";

export interface Product {
  id: string;
  nameKey: ProductTranslationKey;
  subtitleKey?: ProductTranslationKey;
  descriptionKey: ProductTranslationKey;
  href: string;
  icon: string;
}


export const PRODUCTS: Product[] = [
  {
    id: "checkpoint",
    nameKey: "checkpoint.name",
    subtitleKey: "checkpoint.subtitle",
    descriptionKey: "checkpoint.description",
    href: "/checkpoint",
    icon: "/omnixys-original.png",
  },
  {
    id: "finyx",
    nameKey: "finyx.name",
    subtitleKey: "finyx.subtitle",
    descriptionKey: "finyx.description",
    href: "/products/finyx",
    icon: "/omnixys-original.png",
  },
  {
    id: "profile",
    nameKey: "profile.name",
    subtitleKey: "profile.subtitle",
    descriptionKey: "profile.description",
    href: "/products/profile",
    icon: "/omnixys-original.png",
  },
  {
    id: "notifications",
    nameKey: "notifications.name",
    subtitleKey: "notifications.subtitle",
    descriptionKey: "notifications.description",
    href: "/products/notifications",
    icon: "/omnixys-original.png",
  },
];
