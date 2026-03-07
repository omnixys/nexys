import { CssBaseline } from "@mui/material";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  const messages = await getMessages();
  
  return (
    <html lang="de">
      <body>
        <CssBaseline />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
