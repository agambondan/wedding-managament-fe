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
                    <link rel={'stylesheet'}
                          href={'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css'}
                          type={'text/css'}/>
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
