import { CssBaseline } from "@mui/material";
import { NextIntlClientProvider } from "next-intl";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <CssBaseline />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
