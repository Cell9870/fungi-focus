import { useGlobalContext } from "@/context/store";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const { theme } = useGlobalContext();

  return (
    <Html lang="en">
      <Head />
      <body className={theme}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
