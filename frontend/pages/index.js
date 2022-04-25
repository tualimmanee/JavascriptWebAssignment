import Navbar from '../components/navbar'

import styles from '../styles/Home.module.css'



export default function Home({ token }) {
 
  return (
    
    
    
  
    <div class="bg-red-100 sm:h-screen ">
      
        <Navbar />
        <div class="flex flex-col justify-around  items-center space-y-6 pb-14">
        <h1 class="pt-6 text-3xl text-pink-600 flex flex-col justify-around  items-center ">PetIdol Online</h1>
        
        <h1 class="text-2xl text-pink-500">ยินดีต้อนรับ</h1>
        <h1 class="text-2xl text-pink-500">เว็บสำหรับรวบรวมไอดอลน้องหมาและน้องแมวหรือสัตว์เลี้ยงต่างๆไว้ด้วยกันสามารถเข้าชมและติดตามสัตว์เลี้ยงสุดน่ารักได้ผ่านทางเว็บไซต์นี้ทีเดียวเท่านั้น !</h1>
        <iframe width="265" height="500"  src="https://thumbs.gfycat.com/EmotionalSecondDonkey-size_restricted.gif"  >
          
        </iframe>
   
        

    
        </div>  

        <footer class=" flex justify-center mt-4 bg-gradient-to-r from-purple-500 to-pink-500 p-5  ">
        <p class="text-indigo-100 text-2xl ">
        Create by Varot Limmanee
        </p>
        </footer>   


    </div>

  )
}

