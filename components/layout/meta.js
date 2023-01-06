import Head from 'next/head'

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
        </>
    )
}

Meta.defaultProps = {
    title: 'Dashboard',
    keywords: 'Web Development, Programming, Technology, Administrator',
    description: 'Management Landing Page Website'
}

export default Meta