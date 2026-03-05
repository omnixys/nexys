"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import EditLocationRoundedIcon from "@mui/icons-material/EditLocationRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";

import { AnimatePresence, motion } from "framer-motion";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { useEffect, useMemo } from "react";

import { useCity } from "@/hooks/useCities";
import { usePostalCode } from "@/hooks/usePostalCodes";
import { useState } from "@/hooks/useStates";

import UniversalAutocomplete from "../../../ui/UniversalAutocomplete";
import StreetAutocomplete from "./StreetAutocomplete";

import { Country } from "@/graphql/graphql.type";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

type Props = {
  idx: number;
  countries: Country[];
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

  const t = useTypedTranslations("signup.address");
  const enumT = useTypedTranslations("enums");

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

  const postalCodeRequired = postalCodeOptions.length > 0;

  useEffect(() => {
    setValue(`addresses.${idx}.postalCodeRequired`, postalCodeRequired, {
      shouldValidate: true,
      shouldDirty: false,
    });

    if (!postalCodeRequired) {
      setValue(`addresses.${idx}.postalCodeId`, "", { shouldValidate: true });
      setValue(`addresses.${idx}.postalCode`, "", { shouldValidate: true });
    }
  }, [idx, postalCodeRequired, setValue]);

  /**
   * Address Types with icon
   */
  const ADDRESS_TYPES = useMemo(
    () => [
      {
        id: "home",
        label: enumT("addressType.HOME"),
        icon: "house",
      },
      {
        id: "work",
        label: enumT("addressType.WORK"),
        icon: "building",
      },
      {
        id: "billing",
        label: enumT("addressType.BILLING"),
        icon: 'credit-card',
      },
      {
        id: "shipping",
        label: enumT("addressType.SHIPPING"),
        icon: 'truck',
      },
    ],
    [enumT],
  );

  const getAddressIcon = (type?: string) => {
    const found = ADDRESS_TYPES.find((a) => a.id === type);
    return found?.icon ?? <EditLocationRoundedIcon />;
  };

  const title = addressType?.trim()
    ? addressType.trim()
    : idx === 0
      ? t("primary")
      : `${t("address")} #${idx + 1}`;

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
            <AnimatePresence>
              {!!addressType?.trim() && (
                <motion.div
                  variants={revealVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UniversalAutocomplete
                    label={t("fields.country")}
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

                      setValue(`addresses.${idx}.stateId`, "");
                      setValue(`addresses.${idx}.cityId`, "");
                      setValue(`addresses.${idx}.postalCodeId`, "");
                      setValue(`addresses.${idx}.postalCode`, "");
                      setValue(`addresses.${idx}.street`, "");
                      setValue(`addresses.${idx}.houseNumber`, "");
                    }}
                    includeInputInList
                    withCategory
                    sort
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Box sx={{ width: "40%" }}>
            <AnimatePresence>
              {!!countryId && (
                <motion.div
                  variants={revealVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UniversalAutocomplete
                    label={t("fields.state")}
                    options={stateOptions}
                    valueId={stateId}
                    loading={loadingStates}
                    onChange={(val) => {
                      setValue(`addresses.${idx}.stateId`, val?.id ?? "");
                      setValue(`addresses.${idx}.state`, val?.label ?? "");

                      setValue(`addresses.${idx}.cityId`, "");
                      setValue(`addresses.${idx}.city`, "");
                      setValue(`addresses.${idx}.postalCodeId`, "");
                      setValue(`addresses.${idx}.postalCode`, "");
                      setValue(`addresses.${idx}.street`, "");
                      setValue(`addresses.${idx}.houseNumber`, "");
                    }}
                    withCategory
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Stack>

        {/* POSTAL CODE + CITY */}
        <Stack direction="row" spacing={3}>
          <Box sx={{ width: "40%" }}>
            <AnimatePresence>
              {!!cityId && postalCodeRequired && (
                <motion.div
                  variants={revealVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UniversalAutocomplete
                    label={t("fields.postalCode")}
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
            <AnimatePresence>
              {!!stateId && (
                <motion.div
                  variants={revealVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UniversalAutocomplete
                    label={t("fields.city")}
                    options={cityOptions}
                    valueId={cityId}
                    onChange={(val) => {
                      setValue(`addresses.${idx}.cityId`, val?.id ?? "");
                      setValue(`addresses.${idx}.city`, val?.label ?? "");
                      setValue(`addresses.${idx}.postalCodeId`, "");
                    }}
                    withCategory
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

        {/* ADDRESS TYPE + ADDITIONAL INFO */}
        <Stack direction="row" spacing={3}>
          <Box sx={{ width: "20%" }}>
            <Controller
              name={`addresses.${idx}.addressType`}
              control={control}
              render={({ field }) => (
                <UniversalAutocomplete
                  label={t("fields.addressType")}
                  options={ADDRESS_TYPES}
                  freeSolo
                  includeInputInList
                  valueText={field.value ?? ""}
                  onInputTextChange={(text) => field.onChange(text)}
                  onChange={(val) => {
                    if (!val) {
                      field.onChange("");
                      return;
                    }
                    field.onChange(val.id);
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
                  label={t("fields.additionalInfo")}
                />
              )}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
