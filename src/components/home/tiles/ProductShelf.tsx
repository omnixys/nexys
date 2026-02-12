"use client";

import { Product, PRODUCTS } from "@/mocks/products.mock";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import ProductAppIcon from "./ProductAppIcon";

export default function ProductShelf({ isFocused }: { isFocused: boolean }) {
  const router = useRouter();

  const openProduct = (product: Product) => {
    if (isFocused) {
      router.push(product.href);
    }
  };

  return (
    <Box
      sx={{
        ml: 3,
        display: "flex",
        gap: 3,
        overflowX: "auto",
        py: 1,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        scrollSnapType: "x mandatory",
      }}
    >
      {PRODUCTS.map((p, i) => (
        <ProductAppIcon key={p.id} product={p} onOpen={() => openProduct(p)} />
      ))}
    </Box>
  );
}
