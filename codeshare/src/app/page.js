// app/page.tsx (or app/home/page.tsx)
import Home from "./Home/page";

export const metadata = {
  title: "Code Share Nepal - Share & Search Code Snippets",
  description:
    "Save and search your code snippets easily with Code Share Nepal.",
  keywords:
    "Code Share Nepal, code snippets, share code, search code, coding tool",
  openGraph: {
    title: "Code Share Nepal",
    description: "Save and search your code snippets easily.",
    url: "https://code-share-nepal.vercel.app",
    siteName: "Code Share Nepal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code Share Nepal - Share & Search Code Snippets",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <Home />;
}
