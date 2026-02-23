"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { useEffect } from "react";


import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import EditLocationRoundedIcon from "@mui/icons-material/EditLocationRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import { useCity } from "@/hooks/useCities";
import { usePostalCode } from "@/hooks/usePostalCodes";
import { useState } from "@/hooks/useStates";
import UniversalAutocomplete from "../../../ui/UniversalAutocomplete";
import StreetAutocomplete from "./StreetAutocomplete";

const ADDRESS_TYPES = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "billing", label: "Billing" },
  { id: "shipping", label: "Shipping" },
];

const getAddressIcon = (type?: string) => {
  switch (type?.toLowerCase()) {
    case "home":
      return <HomeRoundedIcon />;
    case "work":
      return <WorkRoundedIcon />;
    case "billing":
      return <CreditCardRoundedIcon />;
    case "shipping":
      return <LocalShippingRoundedIcon />;
    default:
      return <EditLocationRoundedIcon />;
  }
};

type Props = {
  idx: number;
  countries: Array<{
    id: string;
    name: string;
    flagSvg?: string;
    flagPng?: string;
  }>;
  canRemove: boolean;
  onRemove: (idx: number) => void;
};

const revealVariant = {
  hidden: { opacity: 0, y: 10, height: 0 },
  visible: { opacity: 1, y: 0, height: "auto" },
  exit: { opacity: 0, y: -10, height: 0 },
};

export default function AddressCard({
  idx,
  countries,
  canRemove,
  onRemove,
}: Props) {
  const { setValue, control } = useFormContext();

  const countryId = useWatch({
    control,
    name: `addresses.${idx}.countryId`,
  }) as string;

  const stateId = useWatch({
    control,
    name: `addresses.${idx}.stateId`,
  }) as string;

  const cityId = useWatch({
    control,
    name: `addresses.${idx}.cityId`,
  }) as string;

  const postalCodeId = useWatch({
    control,
    name: `addresses.${idx}.postalCodeId`,
  }) as string;

  const addressType = useWatch({
    control,
    name: `addresses.${idx}.addressType`,
  }) as string;

  const { stateOptions, loading: loadingStates } = useState(countryId);
  const { cityOptions } = useCity(stateId);
  const { postalCodeOptions } = usePostalCode({ stateId, cityId });

  const title = addressType?.trim()
    ? addressType.trim()
    : idx === 0
      ? "Primary Address"
      : `Address #${idx + 1}`;

  const postalCodeRequired = postalCodeOptions.length > 0;
  useEffect(() => {
    // Sync postalCodeRequired with available postalCode options for the current selection.
    setValue(`addresses.${idx}.postalCodeRequired`, postalCodeRequired, {
      shouldValidate: true,
      shouldDirty: false,
    });

    if (!postalCodeRequired) {
      //Clear postalCode fields when postalCode codes are not used for this selection.
      setValue(`addresses.${idx}.postalCodeCodeId`, "", { shouldValidate: true });
      setValue(`addresses.${idx}.postalCodeCode`, "", { shouldValidate: true });
    }
  }, [idx, postalCodeRequired, setValue]);

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        position: "relative",
      }}
    >
      {canRemove && (
        <IconButton
          onClick={() => onRemove(idx)}
          size="small"
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      )}

      <Stack spacing={3}>
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              {getAddressIcon(addressType)}
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
            </Stack>
          </motion.div>
        </AnimatePresence>

        {/* COUNTRY + STATE */}
        <Stack direction="row" spacing={3}>
          <Box sx={{ width: "60%" }}>
            {/* COUNTRY */}
            <AnimatePresence>
              {!!addressType?.trim() && (
                <motion.div
                  variants={revealVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UniversalAutocomplete
                    label="Country"
                    options={countries.map((c) => ({
                      id: c.id,
                      label: c.name,
                      flagSrc: c.flagSvg || c.flagPng,
                      category: c.name[0].toUpperCase(),
                    }))}
                    valueId={countryId}
                    withFlag
                    onChange={(val) => {
                      setValue(`addresses.${idx}.countryId`, val?.id ?? "");
                      setValue(`addresses.${idx}.country`, val?.label ?? "");

                      // Reset downstream
                      setValue(`addresses.${idx}.stateId`, "");
                      setValue(`addresses.${idx}.cityId`, "");
                      setValue(`addresses.${idx}.postalCodeId`, "");
                      setValue(`addresses.${idx}.postalCode`, "");
                      setValue(`addresses.${idx}.street`, "");
                      setValue(`addresses.${idx}.houseNumber`, "");
                    }}
                    includeInputInList={true}
                    withCategory={true}
                    sort={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Box sx={{ width: "40%" }}>
            {/* STATE */}
            <AnimatePresence>
              {!!countryId && (
                <motion.div
                  variants={revealVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UniversalAutocomplete
                    label="State"
                    options={stateOptions}
                    valueId={stateId}
                    loading={loadingStates}
                    onChange={(val) => {
                      setValue(`addresses.${idx}.stateId`, val?.id ?? "");
                      setValue(`addresses.${idx}.state`, val?.label ?? "");

                      // Reset downstream
                      setValue(`addresses.${idx}.cityId`, "");
                      setValue(`addresses.${idx}.city`, "");
                      setValue(`addresses.${idx}.postalCodeId`, "");
                      setValue(`addresses.${idx}.postalCode`, "");
                      setValue(`addresses.${idx}.street`, "");
                      setValue(`addresses.${idx}.houseNumber`, "");
                    }}
                    withCategory={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Stack>

        <Stack direction="row" spacing={3}>
          <Box sx={{ width: "40%" }}>
            {/* POSTAL CODE */}
            <AnimatePresence>
              {!!cityId && postalCodeRequired && (
                <motion.div
                  variants={revealVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UniversalAutocomplete
                    label="ZIP"
                    options={postalCodeOptions}
                    valueId={postalCodeId}
                    filterMode="startsWith"
                    onChange={(val) => {
                      setValue(`addresses.${idx}.postalCodeId`, val?.id ?? "");
                      setValue(`addresses.${idx}.postalCode`, val?.label ?? "");
                    }}
                    includeInputInList
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Box sx={{ width: "60%" }}>
            {/* CITY */}
            <AnimatePresence>
              {!!stateId && (
                <motion.div
                  variants={revealVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UniversalAutocomplete
                    label="City"
                    options={cityOptions}
                    valueId={cityId}
                    onChange={(val) => {
                      setValue(`addresses.${idx}.cityId`, val?.id ?? "");
                      setValue(`addresses.${idx}.city`, val?.label ?? "");
                      setValue(`addresses.${idx}.postalCodeId`, "");
                    }}
                    withCategory={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Stack>

        {/* STREET */}
        <AnimatePresence>
          {!!stateId && (
            <motion.div
              variants={revealVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <StreetAutocomplete idx={idx} />
            </motion.div>
          )}
        </AnimatePresence>

        <Typography>{addressType}</Typography>

        <Stack direction="row" spacing={3}>
          <Box sx={{ width: "20%" }}>
            <Controller
              name={`addresses.${idx}.addressType`}
              control={control}
              render={({ field }) => (
                <UniversalAutocomplete
                  label="Address Type"
                  options={ADDRESS_TYPES}
                  freeSolo
                  includeInputInList
                  valueText={field.value ?? ""} // ✅ controlled text
                  onInputTextChange={(t) => field.onChange(t)} // ✅ typing updates RHF
                  onChange={(val) => {
                    if (!val) {
                      field.onChange("");

                      // Reset downstream if you want
                      setValue(`addresses.${idx}.countryId`, "");
                      setValue(`addresses.${idx}.country`, "");
                      setValue(`addresses.${idx}.stateId`, "");
                      setValue(`addresses.${idx}.state`, "");
                      setValue(`addresses.${idx}.cityId`, "");
                      setValue(`addresses.${idx}.city`, "");
                      setValue(`addresses.${idx}.postalCodeId`, "");
                      setValue(`addresses.${idx}.postalCode`, "");
                      setValue(`addresses.${idx}.street`, "");
                      setValue(`addresses.${idx}.houseNumber`, "");
                      return;
                    }

                    // selecting an option sets the label text
                    field.onChange(val.label);
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ width: "80%" }}>
            <Controller
              name={`addresses.${idx}.additionalInfo`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Additional info (optional)"
                />
              )}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
