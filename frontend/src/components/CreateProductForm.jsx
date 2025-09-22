import React, { use, useEffect, useState } from 'react'
import { UserPlus, Mail, Lock, User, ArrowRight, Loader, Upload, PlusCircle } from "lucide-react";
import { useProductStore } from '../stores/useProductStore';

const CreateProductForm = () => {
    const { createProduct,products  , loading } = useProductStore();
useEffect(()=>{
    
console.log(products);

},[products])

        const [file, setFile] = useState(null);
    const [newProduct, setNewProduct] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault(e);
      createProduct(newProduct);
        console.log("helo")
    }

    const inputHandler = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

    }
    useEffect(() => {
        console.log(newProduct);

    }, [newProduct])
const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];
const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};
    return (

        <div className='w-full  flex flex-col gap-7 sm:gap-3  items-center  sm:justify-center justify-start  sm:py-2 relative overflow-hidden' >

            <div className=' px-6 py-10  w-full max-w-md   bg-white/50 backdrop-blur-md shadow-md rounded-md'>
                <form onSubmit={handleSubmit} className='space-y-6 w-full'>

                    <div className='head text-md  text-blue-500 sm:text-3xl font-medium'>
                        Create Product
                    </div>
                    <div className='flex flex-col gap-1  '>
                        <span className='text-md sm:text-sm  font-bold'>Product Name</span>
                        <div className='relative '>

                            <input type="text" name='name' placeholder='baggy' onChange={inputHandler} className=' w-full border pl-2 py-2  rounded-md  border-gray-400 ' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1  '>
                        <span className='text-md sm:text-sm  font-bold'>Description</span>
                        <div className='relative '>

                            <textarea type="text" rows='3' name='description' placeholder='Loved it..Genuine item' onChange={inputHandler} className=' w-full border pl-2 py-2  rounded-md  border-gray-400 ' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1  '>
                        <span className='text-md sm:text-sm  font-bold'>Price</span>
                        <div className='relative '>

                            <input type="text" name='price' placeholder='$100' onChange={inputHandler} className=' w-full border pl-2 py-2  rounded-md  border-gray-400 ' />
                        </div>
                    </div>
<div>
    <label htmlFor="category">Category</label>
    <select
        name="category"
        id="category"
        onChange={inputHandler}
        className="w-full border pl-2 py-2 rounded-md border-gray-400"
    >
        <option value=''>Select a category</option>
        {categories.map((category) => (
            <option key={category} value={category}>
                {category}
            </option>
        ))}
    </select>
</div>

  <div className='flex  flex-col gap-1'>
                        <span className='text-md sm:text-sm font-bold'>Upload Image</span>
                        <label className='w-full flex items-center gap-2 bg-gray-200 hover:bg-gray-300 cursor-pointer px-3 py-2 rounded-md border border-gray-400'>
                            <Upload className='w-5 h-5 text-gray-600' />
                            <span>{file ? file.name : "Choose file"}</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className='hidden'
                            />
                        </label>
                    </div>

                    <button type='submit' disabled={loading} className='w-full  bg-red-700 rounded-md flex justify-center py-2 px-3  items-center font-semibold text-xl' >
                        {loading ? (
                            <>
                                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                                Loading...
                            </>
                        ) : (
                            <>
                                <PlusCircle className='mr-2 h-5 w-5' aria-hidden='true' />
                              Create Product
                            </>
                        )}
                    </button>

                </form>
            </div>

        </div>



    )
}

export default CreateProductForm
