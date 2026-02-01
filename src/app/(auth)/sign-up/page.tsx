import { Metadata } from "next";
import SignUpPage from "./SignUpPage";

export const metadata: Metadata = {
  title: {
    default: "Sign Up · Nexys",
    template: "%s · Nexys",
  },
  description:
    "Create your Nexys account by Omnixys. Get secure access to a modular, event-driven platform for scalable, enterprise-grade applications.",

  applicationName: "Nexys",
  generator: "Next.js",
  authors: [{ name: "Omnixys" }],
  creator: "Omnixys",
  publisher: "Omnixys",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  openGraph: {
    type: "website",
    title: "Sign Up · Nexys",
    description:
      "Create your Nexys account — secure access to the modular platform by Omnixys.",
    siteName: "Nexys",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sign Up · Nexys",
    description:
      "Create your Nexys account — secure access to the modular platform by Omnixys.",
  },

  category: "technology",
};

export default function SignPage(): React.JSX.Element {
  return (
    <SignUpPage />
  );
}
