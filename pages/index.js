import { useSession } from "next-auth/react";
import Layout from "./components/Layout";

export default function Home() {
    
  const {data: session} = useSession()
  return(
      <Layout>
        <div className="text-blue-900 flex justify-between">
          <h2>Hello, <br /><b>{session?.user?.name}</b></h2>
          <div className="flex bg-gray-300 text-black gap-1 h-6 w-36 md:w-48 rounded-lg overflow-hidden">
            <img src={session?.user?.image} alt="" className="w-6 h-6 "/>
            <span className="px-2 truncate">{session?.user?.name}</span>
          </div>
        </div>
      </Layout>
    )

  
}

