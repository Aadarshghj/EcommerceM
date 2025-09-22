
import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import AnalyticsTabs from "../components/AnalyticsTabs";
import ProductLists from "../components/ProductLists";

const AdminPage = () => {
  const[index,setindex] = useState(0)
  const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle, component:CreateProductForm },
	{ id: "products", label: "Products", icon: ShoppingBasket ,component:ProductLists},
	{ id: "analytics", label: "Analytics", icon: BarChart, component:AnalyticsTabs},
];

const Active = tabs[index].component;
  return (
    <div className=" w-full min-h-screen flex flex-col gap-3  items-center">
       <h1 className="py-3 text-2xl font-extrabold">Admin Dashboard</h1>
       <div className="flex gap-2  ">
         {
          tabs.map((tab,i)=>(

            <button onClick={()=>setindex(i)} className="text-semibold bg-blue-600 text-white py-2 px-3 rounded-full ">{tab.label}</button>
          ))

       }
       </div>
      
   <Active/>
    </div>
  )
}

export default AdminPage
