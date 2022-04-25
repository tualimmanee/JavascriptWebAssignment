import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config/config'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }
 
    return (
        <Layout class="bg-red-100 sm:h-screen ">
            <Head>
            <meta charset="utf-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

    
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
            <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>
                <title>User profile</title>
            </Head>
            <div class="bg-red-100 sm:h-screen ">
                <Navbar />
               
                 <div class="py-20">
                <div class="py-20">
                <div class="py-20">
                <div class="py-20">
                <div class=" justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-9 grid grid-row-3 gap-3 pt-10 ">
                <h1 class="pt-6 text-3xl text-blue-600 flex flex-col justify-around  items-center font-bold font-mono">Logout</h1>
                <h1 class="pt-6 text-3xl text-blue-600 flex flex-col justify-around  items-center font-bold font-mono">{status}</h1>
                
               
                
                
                </div>
                </div>
                </div>
                </div>
                </div>
                
            </div>
        </Layout>
    )
}
