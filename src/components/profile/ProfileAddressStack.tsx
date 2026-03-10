"use client";

import { useQuery } from "@apollo/client/react";
import { Box, Button, CircularProgress } from "@mui/material";
import AddressCarousel from "@/components/profile/AddressCarousel";
import {
  GetUserAddressesByUserIdDocument,
  type GetUserAddressesByUserIdQuery,
  type GetUserAddressesByUserIdQueryVariables,
} from "@/generated/graphql";

type Props = {
  userId: string;
};

export default function ProfileAddressStack({ userId }: Props) {
  const { data, loading, error, refetch } = useQuery<
    GetUserAddressesByUserIdQuery,
    GetUserAddressesByUserIdQueryVariables
  >(GetUserAddressesByUserIdDocument, {
    variables: { userId },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
  console.error("Failed to load addresses", error);

  return (
    <Box textAlign="center">
      Failed to load addresses
      <Box mt={2}>
        <Button onClick={() => refetch()} variant="outlined">
          Retry
        </Button>
      </Box>
    </Box>
  );
}

  const addresses = data?.getUserAddressesByUserId ?? [];

  if (!addresses.length) {
  return <Box>No addresses available</Box>;
}

  return <AddressCarousel addresses={addresses} />;
}
