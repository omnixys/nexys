import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatEnum } from "../format-enum";
import { USER_STATUS_I18N } from "../../types/user/enum-translations";
import { StatusType } from "@/generated/graphql";


export function formatUserStatus(
  v?: StatusType | null,
  tUser?: any,
): string {
  if (!v) return "—";
  if (tUser) return formatEnum(tUser, USER_STATUS_I18N, v);
  return String(v);
}
export function getStatusIcon(status: StatusType | null | undefined, theme: any) {
  // good
  if (status === StatusType.Active) {
    return <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main }} />;
  }

  // warning-ish
  if (status === StatusType.Inactive) {
    return (
      <PauseCircleOutlineOutlinedIcon
        sx={{ color: theme.palette.warning.main }}
      />
    );
  }

  // bad
  if (status === StatusType.Blocked || status === StatusType.Disabled) {
    return <BlockOutlinedIcon sx={{ color: theme.palette.error.main }} />;
  }

  // terminal
  if ( status === StatusType.Closed) {
    return (
      <DeleteOutlineOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
    );
  }

  return <BadgeOutlinedIcon sx={{ color: theme.palette.text.secondary }} />;
}

export function getStatusValueColor(status: StatusType | null | undefined, theme: any) {
  if (status === StatusType.Active) return theme.palette.success.main;
  if (status === StatusType.Inactive) return theme.palette.warning.main;
  if (status === StatusType.Blocked || status === StatusType.Disabled)
    return theme.palette.error.main;
  return theme.palette.text.primary;
}
