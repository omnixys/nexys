import { UserStatusType } from "../../types/user/user-enum-type";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatEnum } from "../format-enum";
import { USER_STATUS_I18N } from "../../types/user/enum-translations";


export function formatUserStatus(
  v?: UserStatusType | null,
  tUser?: any,
): string {
  if (!v) return "—";
  if (tUser) return formatEnum(tUser, USER_STATUS_I18N, v);
  return String(v);
}
export function getStatusIcon(status: UserStatusType | null | undefined, theme: any) {
  // good
  if (status === UserStatusType.ACTIVE) {
    return <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main }} />;
  }

  // warning-ish
  if (status === UserStatusType.INACTIVE) {
    return (
      <PauseCircleOutlineOutlinedIcon
        sx={{ color: theme.palette.warning.main }}
      />
    );
  }

  // bad
  if (status === UserStatusType.BLOCKED || status === UserStatusType.DISABLED) {
    return <BlockOutlinedIcon sx={{ color: theme.palette.error.main }} />;
  }

  // terminal
  if (status === UserStatusType.DELETED || status === UserStatusType.CLOSED) {
    return (
      <DeleteOutlineOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
    );
  }

  return <BadgeOutlinedIcon sx={{ color: theme.palette.text.secondary }} />;
}

export function getStatusValueColor(status: UserStatusType | null | undefined, theme: any) {
  if (status === UserStatusType.ACTIVE) return theme.palette.success.main;
  if (status === UserStatusType.INACTIVE) return theme.palette.warning.main;
  if (status === UserStatusType.BLOCKED || status === UserStatusType.DISABLED)
    return theme.palette.error.main;
  return theme.palette.text.primary;
}
