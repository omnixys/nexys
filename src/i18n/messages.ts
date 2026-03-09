import command from "../../messages/en/command.json";
import common from "../../messages/en/common.json";
import enums from "../../messages/en/enums.json";
import home from "../../messages/en/home.json";
import layout from "../../messages/en/layout.json";
import login from "../../messages/en/login.json";
import profile from "../../messages/en/profile.json";
import recovery from "../../messages/en/recovery.json";
import security from "../../messages/en/security.json";
import settings from "../../messages/en/settings.json";
import signup from "../../messages/en/signup.json";
import support from "../../messages/en/support.json";
import terms from "../../messages/en/terms.json";

export const messages = {
  common,
  signup,
  enums,
  terms,
  login,
  recovery,
  home,
  command,
  security,
  settings,
  profile,
  support,
  layout,
};

export type Messages = typeof messages;
