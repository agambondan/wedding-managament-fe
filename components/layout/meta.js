import Head from 'next/head'
import Script from "next/script";

const Meta = ({title, keywords, description}) => {
    return (
        <>
            <Head>
                <meta name={'viewport'} content={'width=device-width, initial-scale=1'}/>
                <meta name={'keywords'} content={`${keywords}`}/>
                <meta name={'descriptions'} content={`${description}`}/>
                <link rel={'icon'} href={'/favicon.ico'}/>
                <title>{`Go Blog - ${title}`}</title>
            </Head>
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
        </>
    )
}

Meta.defaultProps = {
    title: 'Dashboard',
    keywords: 'Web Development, Programming, Technology, Administrator',
    description: 'Management Landing Page Website'
}

export default Meta