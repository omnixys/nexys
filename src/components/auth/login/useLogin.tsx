import { AuthProvider, AuthResponse } from "@toolpad/core/SignInPage";
import { signIn } from "next-auth/react";
import { getLogger } from "@/utils/logger";

/**
 * Simulierte Anmeldefunktion, die Authentifizierungsanfragen verarbeitet.
 *
 * @param provider - Der ausgewählte Authentifizierungsanbieter.
 * @param formData - Optional: Formular-Daten, die die Anmeldedaten enthalten.
 * @returns Ein Promise, das ein AuthResponse-Objekt liefert.
 */
export const handleLogin = async (
  provider: AuthProvider,
  formData?: FormData,
): Promise<AuthResponse> => {
  const logger = getLogger(handleLogin.name);
  if (provider.id === "credentials") {
    return new Promise(async (resolve) => {
      try {
        const username = formData?.get("username");
        const password = formData?.get("password");

        const result = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });

        logger.debug("result: " + result?.ok);

        if (!result) {
          return resolve({
            type: "CredentialsSignin",
            error: "Keine Antwort vom Server",
          });
        }

        resolve({
          type: "CredentialsSignin",
          error: result.error ?? undefined,
          success: result.ok ? "Login erfolgreich" : undefined,
        });
      } catch (error) {
        resolve({
          type: "CredentialsSignin",
          error: String(error),
        });
      }
    });
  }

  if (provider.id === "keycloak") {
    return new Promise<AuthResponse>(async (resolve) => {
      try {
        const result = await signIn("keycloak", {
          callbackUrl: "/analytics/customers",
        });

        if (!result) {
          return resolve({
            type: "CredentialsSignin",
            error: "Keine Antwort vom Auth-Provider",
          });
        }

        resolve({
          type: "CredentialsSignin",
          error: result.error ?? undefined,
          success: result.ok ? "Erfolgreich angemeldet" : undefined,
        });
      } catch (error) {
        resolve({
          type: "CredentialsSignin",
          error: String(error),
        });
      }
    });
  }

  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      logger.debug(`Sign in with ${provider.id}`);
      alert(`Signing in with "${provider.name}"`);
      resolve({
        type: "CredentialsSignin",
        error: "Invalid credentials.",
        success: "Check your username for a verification link.",
      });
    }, 500);
  });
};