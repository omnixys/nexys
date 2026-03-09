"use client";

import {
  Box,
  Stack,
  Typography,
  Chip,
  IconButton,
  alpha,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import { GetUserAddressesByUserIdQuery, AddressType } from "@/generated/graphql";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type Address =
  GetUserAddressesByUserIdQuery["getUserAddressesByUserId"][number];

type Props = {
  address: Address;
};

function getAddressTypeIcon(addressType: AddressType) {
  switch (addressType) {
    case AddressType.Home:
      return <HomeOutlinedIcon sx={{ fontSize: 16 }} />;
    case AddressType.Work:
      return <WorkOutlineOutlinedIcon sx={{ fontSize: 16 }} />;
    case AddressType.Billing:
      return <ReceiptLongOutlinedIcon sx={{ fontSize: 16 }} />;
    case AddressType.Shipping:
      return <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />;
    default:
      return <LocationOnIcon sx={{ fontSize: 16 }} />;
  }
}

export default function AddressCard({ address }: Props) {
  const theme = useTheme();
  const t = useTypedTranslations('enums');

  const addressLine = [address.street, address.houseNumber]
    .filter(Boolean)
    .join(" ");

  const cityLine = [address.postalCode, address.city].filter(Boolean).join(" ");

  const addressTypeLabel = t(`addressType.${address.addressType}`);

  return (
    <Box
      sx={{
        flex: "0 0 100%",
        p: 2,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          borderRadius: 3,
          p: 2,
          background: alpha(theme.palette.background.paper, 0.7),
          border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
          cursor: "pointer",
          transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
          minHeight: 220,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[4],
            borderColor: alpha(theme.palette.primary.main, 0.35),
          },
        }}
      >
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Stack direction="row" spacing={1.25} alignItems="center" minWidth={0}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  flexShrink: 0,
                }}
              >
                <LocationOnIcon fontSize="small" />
              </Box>

              <Box minWidth={0}>
                <Typography fontWeight={700} noWrap>
                  {addressLine || "—"}
                </Typography>

                <Typography variant="body2" color="text.secondary" noWrap>
                  {cityLine || address.country || "—"}
                </Typography>
              </Box>
            </Stack>

            <IconButton
              size="small"
              sx={{
                flexShrink: 0,
                bgcolor: alpha(theme.palette.text.primary, 0.05),
                border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                "&:hover": {
                  bgcolor: alpha(theme.palette.text.primary, 0.1),
                },
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              size="small"
              icon={getAddressTypeIcon(address.addressType)}
              label={addressTypeLabel}
              sx={{
                fontWeight: 700,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
              }}
            />

            {address.country && (
              <Chip
                size="small"
                label={address.country}
                sx={{
                  bgcolor: alpha(theme.palette.text.primary, 0.06),
                  fontWeight: 600,
                }}
              />
            )}

            {address.state && (
              <Chip
                size="small"
                label={address.state}
                sx={{
                  bgcolor: alpha(theme.palette.text.primary, 0.06),
                  fontWeight: 600,
                }}
              />
            )}
          </Stack>

          {address.additionalInfo ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {address.additionalInfo}
            </Typography>
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
}