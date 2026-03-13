import {
  BadgeOutlined,
  BlockOutlined,
  CheckCircleOutline,
  DeleteOutlineOutlined,
  PauseCircleOutlineOutlined,
} from "@mui/icons-material";
import type { Theme } from "@mui/material";

import { PersonStatusType } from "@/generated/graphql";
import { formatEnum } from "@/i18n/format-enum";

export function formatUserStatus<T extends (key: any) => string>(
  status: PersonStatusType | null | undefined,
  t: T,
) {
  return formatEnum(t, "userStatus", status);
}

export function getStatusIcon(status: PersonStatusType | null | undefined, theme: Theme) {
  switch (status) {
    case PersonStatusType.Active:
      return <CheckCircleOutline sx={{ color: theme.palette.success.main }} />;

    case PersonStatusType.Inactive:
      return <PauseCircleOutlineOutlined sx={{ color: theme.palette.warning.main }} />;

    case PersonStatusType.Blocked:
      return <BlockOutlined sx={{ color: theme.palette.error.main }} />;

    case PersonStatusType.Closed:
      return <DeleteOutlineOutlined sx={{ color: theme.palette.text.secondary }} />;

    default:
      return <BadgeOutlined sx={{ color: theme.palette.text.secondary }} />;
  }
}

export function getStatusValueColor(status: PersonStatusType | null | undefined, theme: Theme) {
  switch (status) {
    case PersonStatusType.Active:
      return theme.palette.success.main;

    case PersonStatusType.Inactive:
      return theme.palette.warning.main;

    case PersonStatusType.Blocked:
      return theme.palette.error.main;

    default:
      return theme.palette.text.primary;
  }
}
