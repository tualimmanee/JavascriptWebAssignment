import React, { useState, useEffect } from 'react'
import axios from 'axios'
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


    useEffect(() => { getPets() }, [])

    const getPets = async () => {
        let pets = await axios.get(URL)
        setPets(pets.data)

    }
    const buyPet = async (id) => {
        const result = await axios.delete(`${URL2}/${id}`)
        console.log(result.data)
        getPets()
    }


    const printPets = () => {
        if (pets && pets.length)
            return pets.map((pet, index) =>
            
                <li key={index} class=" rounded-lg outline outline-offset-1 outline-blue-200 outline outline-offset-4 ">
                    <h6 class="text-2xl text-indigo-500 pb-1 pt-1 not-italic font-bold font-mono">{(pet) ? pet.name : '-'}</h6>
                    <img src={pet.imageurl} width="160" height="100" class="items-center justify-around"></img>
                    <div class="border-4 border-blue-200 rounded-lg bg-red-100 divide-y-4 divide-blue-200">
                    <h6 class="font-bold font-mono">Age:{(pet) ? pet.number : 0}</h6>
                    <h6 class="font-bold font-mono">Heredity:{(pet) ? pet.price : 0}</h6>

                    </div>
                   
                </li>
                
            )
        else
            return <h1 class="font-bold font-mono text-2xl text-pink-500 items-center "> No Pet</h1>
    }
    return (<div class="bg-red-100 sm:h-screen items-center " >
        <Navbar />
        <div class="flex flex-col justify-around  items-center">
        <h1 class="text-4xl text-pink-500 pb-8 pt-8 font-bold font-mono">Pets Show</h1>
        <ul class=" grid grid-cols-6 gap-10  " >{printPets()}</ul>
        </div>
    </div>
    )

}

export default SWR2

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}