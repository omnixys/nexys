"use client";

import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "../../mock/products.mock";
import { useTypedTranslations } from "../../i18n/useTypedTranslations";
import { OMNIXYS_LOGOS } from "../auth/login/omnixysBranding";

interface Props {
  onOpen: () => void;
}

export default function ProductSelectorMobileButton({ onOpen }: Props) {
  const pathname = usePathname();
  const t = useTypedTranslations("products");

  const active =
    PRODUCTS.find((p) => pathname.startsWith(p.href)) ?? PRODUCTS[0];

  return (
    <Button
      onClick={onOpen}
      variant="text"
      sx={{
        textTransform: "none",
        fontWeight: 600,
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {t(active.nameKey)}
      <ArrowDropDownIcon />
    </Button>
  );
}
