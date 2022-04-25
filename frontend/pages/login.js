import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    const loginForm = () => (
        <div class="font-mono">
            <div>
                Username:
            </div>
            <div>
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password:
            </div>
            <div>
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
    )

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }

    return (
        <Layout>
            <Head >
                <title>Login</title>
                <meta charset="utf-8"></meta>
    

    
    
    
                <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>
            </Head>
            <div class="bg-red-100 sm:h-screen ">
                <Navbar />
                <div class="py-20">
                <div class="py-20">
                <div class="py-20">
                <div class="py-18">
                <div class=" justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-9 grid grid-row-3 gap-3 pt-10 ">
                <h1 class="pt-6 text-3xl text-blue-600 flex flex-col justify-around  items-center ">Login</h1>
                
                
                <div>
                 {status}
                </div>
                
                {loginForm()}
                <div>
                    <button   onClick={login} class="shadow-md mr-4 bg-red-500 p-2 rounded-lg hover:bg-red-200 hover:text-red-500 font-bold font-mono">Login</button>
                    
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
