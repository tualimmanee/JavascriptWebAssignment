import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
// import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import fetch from 'isomorphic-unfetch'

const Meow = ({ file }) => {

    return (
        <Layout>
            <Head>
                <title>Profile</title>
            </Head>
            <div >
                <Navbar />
                
                <h1 >Profile</h1><br/>
                <div>
                    <img src={file} width="500" height="400"  />
                <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>    
                
                </div>
                
            </div>
        </Layout>
    )
    
  }
  Meow.getInitialProps = async () => {
    const res = await fetch('https://aws.random.cat/meow')
    const data = await res.json()
    return data
  }
export default Meow
