import '../styles/globals.css'
import React from "react";
import {WaitForRouter} from "../lib/router";
import ErrorBoundary from "../lib/error";
import Script from "next/script";

function MyApp({Component, pageProps}) {
    // console.log(process.env)
    const Layout = Component.layout || (({children}) => <>{children}</>);
    return (
        <WaitForRouter>
            <ErrorBoundary>
                <React.Fragment>
                    <Layout>
                        <Script
                            id="alpine js"
                            src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
                        />
                        <Script
                            id="font awesome icon js v 6.1.2"
                            src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/js/all.min.js"
                        />
                        <Script
                            id="font awesome icon js v 5.13.0"
                            src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"
                        />
                        <Script
                            id="flowbite datepicker"
                            src="https://unpkg.com/flowbite@1.6.0/dist/datepicker.js"
                        />
                        <Component {...pageProps} />
                    </Layout>
                </React.Fragment>
            </ErrorBoundary>
        </WaitForRouter>
    )
}

export default MyApp
