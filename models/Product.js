const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    price:{
        type:Number, 
        required:true
    },
    images:[{type:String}],
    category:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})

export const Product = models.Product || model('Product', ProductSchema)