import Layout from "@/pages/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from 'axios'

export default function DeleteProductPage(){
    
    const router= useRouter()
    const {id} = router.query
    const [productInfo, setProductInfo] = useState()
    useEffect(()=>{
        if(!id) return
        axios.get('/api/products?id='+id).then(res=>{
            setProductInfo(res.data)
        })
    },[id])
    function goBack(){
        router.push('/products')
    }

    async function deleteProduct(){
        await axios.delete('/api/products?id='+id)
        goBack()
    }
    return(
        <Layout>
            <h1 className="text-center">Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;</h1>
            <div className="flex gap-2 justify-center">
                <button className="bg-red-800 text-white px-4 py-1 rounded-md" onClick={deleteProduct}>Yes</button>
                <button onClick={goBack} className="bg-gray-500 text-white px-4 py-1 rounded-md">No</button>
            </div>
            
        </Layout>
    )
    
}