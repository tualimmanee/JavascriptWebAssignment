import Link from 'next/link'
// import 'bootstrap/dist/css/bootstrap.min.css';

 
const Navbar = () => (
    <nav class="bg-orange-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
  <div class="container flex flex-wrap justify-between items-center mx-auto ">
    <a href="/" class="flex items-center">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/005/484/042/small/dog-logo-illustration-free-vector.jpg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Home</span>
    </a>
  
    <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul class="flex flex-col mt-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
          
          <a href="/pets" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">PetShop</a>
        </li>
        <li>
          <a href="/admin" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Admin</a>
        </li>
        <li>
          <a href="/register" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</a>
        </li>
        <li>
          <a href="/login" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</a>
        </li>
        <li>
          <a href="/logout" class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
        </li>
        <li>
          <a href="https://www.facebook.com/TuarLimmanee" class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact Us</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    
    // <div >
      
    //   <ul >
    
          
    //     <li class="nav-item "  >
    //       <Link href="/"><a class="nav-link" >Home </a></Link> 
    //     </li>
        
    //     {/* <li class="nav-item ">
    //         <Link href="/meow"><a class="nav-link">Profile</a></Link>
    //     </li> */}
        
    //     <li class="nav-item ">
    //         <Link href="/pets"><a class="nav-link">PetShop</a></Link>
    //     </li>
        

    //     <li class="nav-item">
    //         <Link href="/admin"><a class="nav-link">Admin</a></Link>
    //     </li>

        
    //     {/*          
    //     <li class=" col-9">
        
    //     </li> */}
    
    
    //     <li class="nav-item">
    //         <Link href="/register"><a class="nav-link active">Register</a></Link>
    //     </li>

    //     <li class="nav-item">
    //         <Link href="/login"><a class="nav-link active">Login</a></Link>
    //     </li>

    //     <li class="nav-item">
    //         <Link href="/logout"><a class="nav-link active"> Logout</a></Link>
    //     </li>


        
    //  </ul>
  
   
   

    // </div>
    
    
  
)

export default Navbar