import '../styles/globals.css'
import Head from "next/head";
import React from "react";
import {WaitForRouter} from "../lib/router";
import ErrorBoundary from "../lib/error";

function MyApp({Component, pageProps}) {
    const Layout = Component.layout || (({children}) => <>{children}</>);
    return (
        <WaitForRouter>
            <React.Fragment>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </React.Fragment>
        </WaitForRouter>
    )
}

export default MyApp
