import express from "express";
const router = express.Router();
import Product from "../models/product.model.js";
import { redis } from "../db/redis.js";
import cloudinary from "../db/cloudinary.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
        console.log("hai");

    }


}

export const getFeaturedProducts = async (req, res) => {

    try {
        let featuredProducts = await redis.get("features_products");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }
        featuredProducts = await Product.find({ isFeatured: true }).lean()

        if (!featuredProducts) {
            return res.status(401).json({ message: "No featured products found" })
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts));
        res.json(featuredProducts)

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })

    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })
        }
        const product = await Product.create({
            name, description, price, image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : ""
            , category,

        })
        res.status(201).json(product);
    } catch (error) {
        console.log("error in creating", error.message);


        res.status(500).json({ message: "server error", error: error.message })
    }

}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({ message: "p not found" })
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("image deleted");
            } catch (error) {
                console.log("error in deleting", error);

            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "product deleted successfully" })

    } catch (error) {
        console.log("error in deleting", error.message);


        res.status(500).json({ message: "server error", error: error.message })

    }

}

export const getRecomendedProducts = async (req, res) => {
   try {
     const products = await Product.aggregate([


        { $sample: { size: 3 } },
        {

            $project: {
                _id: 1,
                name: 1,
                description: 1,
                image: 1,
                price: 1
            }

        }

    ])
    res.json(products)
   } catch (error) {
            console.log("error in recommendations", error.message);


        res.status(500).json({ message: "server error", error: error.message })

   }

}

export const getProductBYCategoey = async (req,res) => {
    const {category} = req.params;
    try {
const products = await Product.find({category});
res.json({products});

        
    } catch (error) {
          console.log("error in category", error.message);


        res.status(500).json({ message: "server error", error: error.message })
        
    }
    
}

export const toggleFeaturedProduct = async (req,res) => {
    const product = await Product.findById(req.params.id);
   try {
     if(product){
        product.isFeatured = !product.isFeatured;
        const updatedProduct= await product.save();
        await updateProductsCache();
        res.json(updatedProduct)
    }else{
        res.status(404).json({message:"product not found"})
    }
    
   } catch (error) {
      console.log("error in updation", error.message);


        res.status(500).json({ message: "server error", error: error.message })
   }
}

async function updateProductsCache (){

    try {
        const  featuredProducts = await Product.find({ isFeatured: true }).lean();
        

        await redis.set("featured_products", JSON.stringify(featuredProducts));

        
    } catch (error) {
              console.log("error in updation", error.message);
                res.status(500).json({ message: "server error", error: error.message })
    }
}