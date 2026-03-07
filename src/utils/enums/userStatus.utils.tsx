import { Theme } from "@mui/material";
import {
  CheckCircleOutline,
  PauseCircleOutlineOutlined,
  BlockOutlined,
  DeleteOutlineOutlined,
  BadgeOutlined,
} from "@mui/icons-material";

import { PersonStatus } from "@/generated/graphql";
import { formatEnum, Translator } from "@/i18n/format-enum";

export function formatUserStatus<T extends (key: any) => string>(
  status: PersonStatus | null | undefined,
  t: T,
) {
  return formatEnum(t, "userStatus", status);
}

export function getStatusIcon(
  status: PersonStatus | null | undefined,
  theme: Theme,
) {
  switch (status) {
    case PersonStatus.Active:
      return <CheckCircleOutline sx={{ color: theme.palette.success.main }} />;

    case PersonStatus.Inactive:
      return (
        <PauseCircleOutlineOutlined
          sx={{ color: theme.palette.warning.main }}
        />
      );

    case PersonStatus.Blocked:
      return <BlockOutlined sx={{ color: theme.palette.error.main }} />;

    case PersonStatus.Closed:
      return (
        <DeleteOutlineOutlined sx={{ color: theme.palette.text.secondary }} />
      );

    default:
      return <BadgeOutlined sx={{ color: theme.palette.text.secondary }} />;
  }
}

export function getStatusValueColor(
  status: PersonStatus | null | undefined,
  theme: Theme,
) {
  switch (status) {
    case PersonStatus.Active:
      return theme.palette.success.main;

    case PersonStatus.Inactive:
      return theme.palette.warning.main;

    case PersonStatus.Blocked:
      return theme.palette.error.main;

    default:
      return theme.palette.text.primary;
  }
}
