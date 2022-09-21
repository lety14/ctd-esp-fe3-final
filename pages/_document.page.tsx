import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{ height: "100%" }}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono"
          rel="stylesheet"
        />
        <link rel="icon" href="/marvel.png" />
      </Head>
      <body style={{ height: "100%" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
