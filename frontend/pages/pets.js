import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import useSWR, { mutate } from 'swr'
import Head from 'next/head'
// import styles from '../styles/pets.module.css'
import Navbar from "../components/navbar";

const URL = "http://localhost/api/pets";
const URL2 = "http://localhost/api/purchase";

const fetcher = url => axios.get(url).then(res => res.data)

const SWR2 = () => {
    const [pets, setPets] = useState({ list: [{ id: 1, name: 'cat', number: 1, price: 2000 },] })
    const [pet, setPet] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const [imageurl,setImageurl] = useState('')
    const [price, setPrice] = useState(0)
  //  const { data } = useSWR(URL, fetcher)
    //const { data } = useSWR(URL2, fetcher)


    useEffect(() => { getPets() }, [])

    const getPets = async () => {
        let pets = await axios.get(URL)
        setPets(pets.data)
        //console.log('Pet:', pets.data)
    }
    const buyPet = async (id) => {
        const result = await axios.delete(`${URL2}/${id}`)
        console.log(result.data)
        getPets()
    }


    const printPets = () => {
        if (pets && pets.length)
            return pets.map((pet, index) =>
            
                <li key={index}>
                    <h6>{(pet) ? pet.name : '-'}</h6>
                    <img src={pet.imageurl} width="160" height="100"></img><br/>
                    <h6>จำนวน:{(pet) ? pet.number : 0}</h6>
                    <h6>Price:{(pet) ? pet.price : 0}</h6>

                    <button onClick={() => buyPet(pet.id)}  >Buy</button>
                   
                </li>
                
            )
        else
            return <li> No Pet</li>
    }
    return (<div class="bg-red-100 sm:h-screen " >
        <Navbar />
        <div class="flex flex-col justify-around  items-center">
        <h1 class="text-2xl text-pink-500">Petshop</h1>
        <ul class=" grid grid-cols-8 gap-10  " >{printPets()}</ul>
        </div>
    </div>
    )

}

export default SWR2

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}