import {
  Key,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  AuthResponse,
  SupportedAuthProvider,
  type AuthProvider,
} from "@toolpad/core/SignInPage";
import { JSX } from "react";

/**
 * Liste der unterstützten Authentifizierungsanbieter.
 */
export const providers: {
  id: SupportedAuthProvider;
  name: string;
  icon?: JSX.Element;
}[] = [
  { id: "github", name: "GitHub", icon: <GitHubIcon /> },
  { id: "google", name: "Google", icon: <GoogleIcon /> },
  { id: "facebook", name: "Facebook", icon: <FacebookIcon /> },
  { id: "twitter", name: "Twitter", icon: <TwitterIcon /> },
  { id: "linkedin", name: "LinkedIn", icon: <LinkedInIcon /> },
  { id: "keycloak", name: "Keycloak", icon: <Key /> },
  { id: "credentials", name: "Username and Password" },
];
