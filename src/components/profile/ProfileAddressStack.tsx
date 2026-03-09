"use client";

import AddressCarousel from "@/components/profile/AddressCarousel";
import { GetUserAddressesByUserIdDocument, GetUserAddressesByUserIdQuery, GetUserAddressesByUserIdQueryVariables } from "@/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { Box, CircularProgress } from "@mui/material";

type Props = {
  userId: string;
};

export default function ProfileAddressStack({ userId }: Props) {
  const { data, loading, error } = useQuery<GetUserAddressesByUserIdQuery, GetUserAddressesByUserIdQueryVariables>(GetUserAddressesByUserIdDocument, {
    variables: { userId },
    fetchPolicy: "cache-first",
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        Failed to load addresses
      </Box>
    );
  }

  const addresses = data?.getUserAddressesByUserId ?? [];

  return <AddressCarousel addresses={addresses} />;
}