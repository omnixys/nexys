export type AddressSnapshot = {
  street?: string | null;
  houseNumber?: string | null;

  postalCode?: string | null;
  cityName?: string | null;

  stateName?: string | null;
  countryName?: string | null;

  additionalInfo?: string | null;
};

/**
 * Returns formatted address as multiple lines.
 * Safe against missing values.
 */
export function formatAddressLines(addr?: AddressSnapshot) {
  if (!addr) return [];

  const line1 = [addr.street, addr.houseNumber].filter(Boolean).join(" ");

  const line2 = [addr.postalCode, addr.cityName].filter(Boolean).join(" ");

  const line3 = [addr.stateName, addr.countryName].filter(Boolean).join(", ");

  return [line1, line2, line3, addr.additionalInfo].filter(Boolean);
}

/**
 * Returns a compact one-line address.
 */
export function formatAddressInline(addr?: AddressSnapshot) {
  return formatAddressLines(addr).join(" • ");
}
