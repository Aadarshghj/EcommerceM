import React from 'react'
import { lazy } from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ category }) => {
    return (
        <div className='h-96 w-full overflow-hidden bg-red-300'>
            <Link to={"/category" + category.href}>
                <div className='w-full h-full relative'>
                    <img className='w-full h-full' src={category.imageUrl}
                        alt={category.name} loading='lazy' />

                    <div className='absolute bottom-0 left-0 right-0 p-4 z-20'>
                        <h3 className='text-white text-2xl font-bold mb-2'>{category.name}</h3>
                        <p className='text-gray-200 text-sm'>Explore {category.name}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CategoryItem
