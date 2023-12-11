import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
            <Head>
                <meta name="application-name" content="TechFestKEC" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="TechFestKEC" />
                <meta name="description" content="This webapp is dedicated for Technical Festival of KEC Katihar" />
                <meta name="theme-color" content="#fff" />
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
