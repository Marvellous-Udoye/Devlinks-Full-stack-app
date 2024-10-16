"use client"

import { metadata } from "./metadata";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";
import store from "./redux/store";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const title = String(metadata?.title || "Default Title");
  const description = metadata?.description || "Default description";

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" type="image/svg" href="/images/logo.svg" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
