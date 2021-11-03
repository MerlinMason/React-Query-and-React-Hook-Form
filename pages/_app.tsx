import type { AppProps } from "next/app";
import axios from "axios";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";
import { ReactQueryDevtools } from "react-query/devtools";

import Layout from "../components/Layout";

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
    <QueryClientProvider client={queryClient}>
        <Head>
            <title>NextProject</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout>
            <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);

export default App;
