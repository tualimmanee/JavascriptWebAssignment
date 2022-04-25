import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from "../components/navbar";
import withAuth from "../components/withAuth";


const URL = "http://localhost/api/pets";
const URL2 = "http://localhost/api/income";
const URL3 = "http://localhost/api/repets";
const URL4 = "http://localhost/api/addpet";


const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
    const [pets, setPets] = useState({})
    const [pet, setPet] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const [price, setPrice] = useState(0)
    const [imageurl,setImageurl] = useState('')
    const [income, setIncome] = useState(0)
    //const { data } = useSWR(URL, URL2, fetcher)


    useEffect(() => {
        getPets();
        getIncome();
        profileUser();
      }, []);

    const profileUser = async () => {
        try {
          // console.log('token: ', token)
          const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log('user: ', users.data)
          setUser(users.data);
        } catch (e) {
          console.log(e);
        }
      };
    
    const getPets = async () => {
        let pets = await axios.get(URL)
        setPets(pets.data)
        //console.log('pet:', pets.data)
    }
    const getIncome = async () => {
        let income = await axios.get(URL2)
        setIncome(income.data)
        //console.log('income:', income.data)
    }

    const getPet = async (id) => {
        let pet = await axios.get(`${URL}/${id}`)
        console.log('bear id: ', pet.data)
        setPet({ id: pet.data.id, name: pet.data.name, number: pet.data.number, price: pet.data.price, imageurl: pet.data.imageurl })
    }



    const printPets = () => {
        if (pets && pets.length)
            return pets.map((pet, index) =>
            <div >
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
           
                <li key={index} class=" rounded-lg outline outline-offset-1 outline-cyan-500 outline outline-offset-4"><link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap " rel="stylesheet"></link>
                    
                    <h6 >Name:{(pet) ? pet.name : '-'}</h6>
                    <img src={(pet.imageurl)} width="160" height="100"></img>
                   <h6>Number:&nbsp;&nbsp;<button onClick={() => reduce(pet.id,pet.number)} class="border-2 border-indigo-600 rounded-full">&nbsp;- &nbsp;</button>{(pet) ? pet.number : 0}<button onClick={() => addNumber(pet.id,pet.number)} class="border-2 border-indigo-600 rounded-full">&nbsp;+&nbsp;</button></h6>
                   Heredity: &nbsp;{(pet) ? pet.price : 0}
                    <div class="pl-3 justify-around  items-center space-y-3 pb-3">
                    <button  onClick={() => deletePet(pet.id)} class="shadow-md mr-4 bg-yellow-500 p-2 rounded-lg hover:bg-yellow-200 hover:text-red-500 " >Delete</button>
                   
                    <button onClick={() => updatePet(pet.id)} class="shadow-md mr-4 bg-red-500 p-2 rounded-lg hover:bg-red-200 hover:text-red-500">Update</button>
                   </div>
                </li>
              
                </div>
            )
        else
            return <li> No Pet</li>
    }

    const printIncome = () => {
        return income
    }


    const addPet = async (name, number, price, imageurl ) => {
        let pets = await axios.post(URL, { name, number, price, imageurl })
        setPets(pets.data)
    }

    


    const deletePet = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        getPets()
    }

    const updatePet = async (id) => {
        const result = await axios.put(`${URL}/${id}`, { id, name, number, price, imageurl })
        //console.log('student id update: ', result.data)
        getPets()
    }

    const reduce = async (id, number) => {
        if (number > 0) {
            let num = number - 1
            setPets(num)
            console.log('number=' + num)
            const result = await axios.put(`${URL3}/${id}`, { id, num })
        }
        getPets()
    }

    const addNumber = async (id, number) => {
        const result = await axios.put(`${URL4}/${id}`, { id,number })
        console.log(number)
        getPets()
    }
    


    return (
        <div class="bg-red-100 sm:h-screen ">
            <Navbar />
            
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
             <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
        
        
        
        <div >
          
          <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>
          <div class="flex flex-col justify-around  items-center space-y-1 pb-14">
        <h1 class="font-mono pt-10">Admin</h1>
        
       
        <ul class=" grid grid-cols-8 gap-10  pt-10">{printPets()}</ul>
        
        
        <ul class=" grid grid-row-8 gap-0 pt-10 font-mono" ><h2 class="font-mono">Add item</h2>&nbsp;Name:&nbsp;<input type="text" onChange={(e) => setName(e.target.value)} />
            &nbsp;Age:&nbsp;<input type="number" onChange={(e) => setNumber(e.target.value)} /> 
            &nbsp;Heredity:&nbsp;<input type="text" onChange={(e) => setPrice(e.target.value)} /> 
            &nbsp;image.url:&nbsp;<input type="Linkd" onChange={(e) => setImageurl(e.target.value)} /> 
        <div class="pt-6"></div>
            <button onClick={() => addPet(name,number, price,imageurl)} class="shadow-md mr-4 bg-red-500 p-2 rounded-lg hover:bg-red-200 hover:text-red-500 font-mono ">Add new item</button>
        </ul>

        <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap " rel="stylesheet" ></link>
        
        </div>
     
           </div>
          
    </div>
    )
}

export default withAuth(SWR1);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
  }
