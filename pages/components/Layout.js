import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav"
import { useState } from "react"

export default function Layout({children}) {
  const [showNav, setShowNav] = useState(false)
  const { data: session } = useSession()
  if(!session){
    return(
      <div className='bg-blue-900 w-screen h-screen flex items-center'>
          <div className="h-full w-full">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fbillionaire365.com%2Fwp-content%2Fuploads%2F2019%2F02%2FEcommerce-Website.jpg%3Ffit%3D2048%252C1452%26ssl%3D1&f=1&nofb=1&ipt=0b13eb8b6ddc48850a885758ce7da7d0b3b24e568b4a8498a72879109bd13a3c&ipo=images" className="h-full"/>
          </div>
          <div className="text-center w-full">
            <button onClick={()=>signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
          </div>
        </div>
    )
  }
  return (
    <div className=" min-h-screen">
    <div className=" md:hidden flex gap-4 p-2">
    <button onClick={()=>setShowNav(true)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>

    </button>
   
    <div className='flex gap-1 text-blue-700 font-bold'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
        <span>TechKartAdmin</span>
        </div>
       
    </div>
    
    <div className="flex">
        <Nav show={showNav}/>
        <div className="flex-grow p-4">
            {children}
        </div>
    </div>
    </div>
    
  )
}

//Loggin In {session.user.email}
//('google) redirect to login page