import About from "./about"
import Head from "next/head"
import Layout from '../components/Layout'
import 'semantic-ui-css/semantic.min.css'
import "../../css/style.css"
export default function App({Component, pageProps}){
    console.log("Hello from _app")
    return(
        <>
        <Head>
        </Head>
            <Layout>
            <Component {...pageProps}/>
            </Layout>
        </> 
       
    )
}