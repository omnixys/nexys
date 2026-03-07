/**
 * @file products.mock.ts
 * @description Mock products for Products shelf (i18n-ready)
 */

import type { ProductTranslationKey } from "@/i18n/keys";

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
    id: "nexys",
    nameKey: "products.nexys.name",
    subtitleKey: "products.nexys.subtitle",
    descriptionKey: "products.nexys.description",
    href: "/home",
    icon: "/logo/omnixys-original.png",
  },
  {
    id: "checkpoint",
    nameKey: "products.checkpoint.name",
    subtitleKey: "products.checkpoint.subtitle",
    descriptionKey: "products.checkpoint.description",
    href: "/checkpoint",
    icon: "/logo/omnixys-original.png",
  },
  {
    id: "finyx",
    nameKey: "products.finyx.name",
    subtitleKey: "products.finyx.subtitle",
    descriptionKey: "products.finyx.description",
    href: "/products/finyx",
    icon: "/logo/omnixys-original.png",
  },
  {
    id: "profile",
    nameKey: "products.profile.name",
    subtitleKey: "products.profile.subtitle",
    descriptionKey: "products.profile.description",
    href: "/products/profile",
    icon: "/logo/omnixys-original.png",
  },
  {
    id: "notifications",
    nameKey: "products.notifications.name",
    subtitleKey: "products.notifications.subtitle",
    descriptionKey: "products.notifications.description",
    href: "/products/notifications",
    icon: "/logo/omnixys-original.png",
  },
];
