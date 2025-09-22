import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const {fetchProductsByCategory,products} = useProductStore();
  const {category} = useParams()

useEffect(()=>{
fetchProductsByCategory(category);

},[])
console.log(products);

  return (
    <div className='min-h-screen w-full flex flex-col  justify-start items-center  '>
<h1 className='text-2xl font-bold text-green-500 pt-5 pb-3'>{category.toUpperCase()}</h1>

<div className='grid grid-cols-5 justify-center  gap-3'>



     {
products.map((item)=>(

  <ProductCard key={item._id} item={item} />
))

      }
    
</div>
 
    </div>
  )
}

export default CategoryPage
