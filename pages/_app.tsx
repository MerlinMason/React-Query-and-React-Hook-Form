import type { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";

import Layout from "../components/Layout";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>NextProject</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout>
            <Component {...pageProps} />
        </Layout>
    </>
);

export default App;
