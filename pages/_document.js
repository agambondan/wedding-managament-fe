import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/*<link rel="stylesheet"*/}
                    {/*      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"*/}
                    {/*      type="text/css"/>*/}
                    {/*<link rel="stylesheet"*/}
                    {/*      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"*/}
                    {/*      type="text/css"/>*/}
                </Head>
                <body className="bg-gray-100 font-family-karla">
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
