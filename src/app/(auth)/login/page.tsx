import { Metadata } from 'next';
import LoginInPage from './LogInPage';

export const metadata: Metadata = {
  title: {
    default: "Nexys · Login",
    template: "%s · Nexys",
  },
  description:
    "Secure sign-in to Nexys by Omnixys. Access your modular, event-driven platform for scalable, enterprise-grade applications.",

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
    title: "Login · Nexys",
    description:
      "Secure access to Nexys — the modular, event-driven platform by Omnixys.",
    siteName: "Nexys",
  },

  twitter: {
    card: "summary_large_image",
    title: "Login · Nexys",
    description: "Secure access to Nexys — the modular platform by Omnixys.",
  },

  category: "technology",
};

export default function Page() {
  return <LoginInPage />;
}
