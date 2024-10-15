"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import { Provider } from "react-redux";
import store from "./redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
