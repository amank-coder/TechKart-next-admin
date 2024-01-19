import { Product } from "@/models/Product"
import { mongooseConnect } from "@/lib/mongoose"
import mongoose from "mongoose"

export default async function handle(req, res){
    const {method} = req
    await mongooseConnect()
    
    if(method==='GET')
    {
        if(req.query?.id)
        {
            res.json(await Product.findOne({_id:req.query.id}))
        }
        res.json(await Product.find())
    }

    
    if(method==='POST')
    {
        const {title, category, description, price, images} = req.body
        const productDoc = await mongoose.model('Product').create({
            title, category, description, price, images
        })
        res.json(productDoc)
    }

    if(method==='PUT'){
        const {title, category, description, price,images, _id} = req.body
        await Product.updateOne({_id}, {title, category, description, price, images})
        res.json(true)
    }

    if(method==='DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query.id})
            res.json(true)
        }else{
            return res.status(400).json({ error: 'Product ID is required' });
        }
    }
}