import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>
            TechFusion&apos;25 - Katihar Engineering College, Katihar
          </title>
          <meta name="application-name" content="TechFusion'25" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="google-site-verification"
            content="gFJoFSkD6WYmKV5bO1HwIx3hVUnL8td2UT7l0i1GxS8"
          />
          <meta name="apple-mobile-web-app-title" content="TechFusion" />
          <meta
            name="description"
            content="TechFusion'25 - Join Katihar Engineering College, Katihar's annual extravaganza! Four days of innovation, cultural vibrancy, and technical brilliance from Jan 10-13, 2025. Participate in diverse engineering competitions, workshops, and enjoy captivating cultural performances. Total prizes worth Rs 2 Lakhs await!"
          />
          <meta
            name="keywords"
            content="TechFusion, TechFusion 2025, Katihar Engineering College, Engineering Competitions, Cultural Fest, Innovation, Prizes, Workshops"
          />
          <meta name="author" content="TechFusion'25 Team" />
          <meta name="robots" content="index, follow" />
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#00040F" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
