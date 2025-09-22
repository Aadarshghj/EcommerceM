import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore'
import { Trash, Star } from "lucide-react";
const ProductLists = () => {

  const {products,loading,getAllProducts,  toggleFeaturedProduct , deleteProduct} = useProductStore();
 useEffect(() => {
    getAllProducts(); // fetch products on mount
  
  }, [getAllProducts]);

  useEffect(() => {
    
    console.log(products); // check structure
  }, [products]);

  const fetureHandler = (id) =>{
    console.log("hello")
  toggleFeaturedProduct(id)
  }
  
  const deleteHandler = (id) =>{
    deleteProduct(id)
  toggleFeaturedProduct(id)
  }
 
 
return (

<div className="min-w-screen">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 text-white">
                    Product name
                </th>
               
                <th scope="col" class="px-6 py-3 text-white">
                    Category
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Price
                </th>
               
                 <th scope="col" class="px-6 py-3 text-white">
                    FEATURED
                </th>
                 <th scope="col" class="px-6 py-3 text-white">
                  ACTIONS
                </th>
                 <th scope="col" class="px-6 py-3 text-white">
                Image
                </th>
            </tr>
        </thead>
        <tbody>
          {
            products.map((item)=>(
              <tr key={item._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
               
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.name}
                </th>
                <td class="px-6 py-4">
                    {item.category}
                </td>
               
                <td class="px-6 py-4">
                    $2999
                </td>
                 <td  className='px-6 py-4'>
              <Star  onClick={()=>{fetureHandler(item._id)}} className= {` h-5 w-5 ${item.isFeatured ? "bg-amber-200" : 'bg-gray-600'}`} />
                </td>
                <td  onClick={()=>{deleteHandler(item._id)}} className='px-6 py-4'>
              <Trash className= "bg-red-500" />
                </td>
                <td  className='px-6 py-4'>
          <img src={item.image} className="h-7 w-7" alt="" />
                </td>
            </tr>

            ))
          }
            
            
        </tbody>
    </table>
</div>

  )
}

export default ProductLists
