import { useState } from "react"
import { useRouter } from "next/router"
import axios from 'axios'

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages,
    category:existingCategory,
})
{
    const [title, setTitle] = useState(existingTitle || "")
    const [description, setDescription] = useState(existingDescription || "")
    const [price, setPrice] = useState(existingPrice || "")
    const [category, setCategory] = useState(existingCategory || "")
    const [images,setImages] = useState(existingImages || [])
    const router = useRouter()

    async function saveProduct(e){
        e.preventDefault()
        const data= {title, description, price, images, category}
        if(_id){
            await axios.put('/api/products', {...data, _id})
        }else{
            
            await axios.post('/api/products', data)
            
        }
        router.push('/products')
        
    }

    async function uploadImages(e){
        const files = e.target?.files
        console.log(files.length)
        if(files?.length>0){
            const data= new FormData()
            for(const file of files){data.append('file',file)}
            const res=await axios.post('/api/upload', data)
            setImages(oldImages=>{
                return [...oldImages, ...res.data.links]
            })
            console.log(res)
        }
    }

    return(
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input type="text" placeholder="product-name" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <label>Category</label>
            <input type="text" placeholder="product-category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            <label>
                Photos
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
                {!!images?.length && images.map(link=>(
                    <div key={link} className="h-24">
                        <img src={link} alt='' className="rounded-lg max-h-full"/>
                    </div>
                ))}
                <label className="h-24 w-24 rounded-md flex items-center justify-center gap-1 text-sm bg-gray-200 text-gray-500 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>

                    <div>Upload</div>
                    <input type="file" onChange={uploadImages} className="hidden" />
                </label>
            
                {!images?.length &&(
                    <div>No photos in this product</div>
                )}
            </div>
            <label>Description</label>
            <textarea placeholder="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <label>Price</label>
            <input type="number" placeholder="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <button className="btn-primary" type="submit">Save</button>
        </form>

    )
}