import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'



export default function Home({ token }) {
 
  return (
    
    <Layout>
    <Head>
        <title>First Page</title>
        
        <meta charset="utf-8"></meta>
   
    
   
    </Head>
    <div className={styles.container}>
      
        <Navbar />
        
        <h1>PetShop Online</h1>
        <h2>ยินดีต้อนรับ</h2>
        <iframe width="265" height="500"  src="https://thumbs.gfycat.com/EmotionalSecondDonkey-size_restricted.gif"  ></iframe>
   
      
            <h2>Create by Varot Limmanee</h2>
   
    </div>
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
