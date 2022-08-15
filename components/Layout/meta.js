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
            {/*<Script*/}
            {/*    id="tiny mce"*/}
            {/*    src="https://cdn.tiny.cloud/1/v6lx3ohrair0pthr5tn6ex0uqnicspn03xbbpnyip45t3jm7/tinymce/6/tinymce.min.js"*/}
            {/*/>*/}
            <Script
                id="alpine js"
                src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
            />
            <Script
                id="font awesome icon js"
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