import { Key, Password, Email, Fingerprint } from "@mui/icons-material";

import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

import { type AuthProvider } from "@toolpad/core/SignInPage";

import { JSX } from "react";

/**
 * Extended provider IDs for custom authentication flows.
 */
export type ExtendedAuthProvider =
  | "github"
  | "google"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "keycloak"
  | "credentials"
  | "totp"
  | "webauthn"
  | "magic-link";

/**
 * List of supported authentication providers.
 */
export const providers: {
  id: ExtendedAuthProvider;
  name: string;
  icon?: JSX.Element;
}[] = [
  { id: "github", name: "GitHub", icon: <GitHubIcon /> },
  { id: "google", name: "Google", icon: <GoogleIcon /> },
  { id: "facebook", name: "Facebook", icon: <FacebookIcon /> },
  { id: "twitter", name: "Twitter", icon: <TwitterIcon /> },
  { id: "linkedin", name: "LinkedIn", icon: <LinkedInIcon /> },
  { id: "keycloak", name: "Keycloak (SSO)", icon: <Key /> },

  // Classic login
  { id: "credentials", name: "Username & Password", icon: <Password /> },

  // MFA / Advanced Auth
  { id: "totp", name: "TOTP (Authenticator App)", icon: <Fingerprint /> },
  { id: "webauthn", name: "Passkey / WebAuthn", icon: <Fingerprint /> },
  { id: "magic-link", name: "Magic Link (Email)", icon: <Email /> },
];
