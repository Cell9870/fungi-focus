import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import { GlobalContextProvider } from "@/context/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <GlobalContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </GlobalContextProvider>
    </SessionProvider>
  );
}
