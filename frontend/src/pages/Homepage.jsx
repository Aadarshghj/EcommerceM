import React from 'react'
import CartItem from '../components/CartItem';
import CategoryItem from '../components/CategoryItem';

const Homepage = () => {
  const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center '>
      <div className=' py-9 flex flex-col '>
        <h1 className='font-extrabold text-5xl'> Explore Our Ideas</h1> 
               <p className='pt-3 px-6 text-blue-500 font-semibold'> Discover the latest trends in ecofriendly fashion!</p>
               </div>
  

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{
  categories.map((category)=>(
    <CategoryItem category={category} key={category.name}/>
  ))
}

          </div>
        </div>
 
  )
}

export default Homepage
