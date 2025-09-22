import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/auth.middleware.js";
import { getAllProducts, getFeaturedProducts,createProduct, deleteProduct, getRecomendedProducts, getProductBYCategoey, toggleFeaturedProduct } from "../controllers/product.controller.js";

router.get('/',protectRoute,isAdmin,getAllProducts);
router.get('/featured',getFeaturedProducts);
router.get('/category/:category',getProductBYCategoey);

router.get('/recomendations',getRecomendedProducts);
router.post('/',protectRoute,isAdmin,createProduct);
router.delete('/:id',protectRoute,isAdmin,deleteProduct );
router.patch('/:id',protectRoute,isAdmin,toggleFeaturedProduct)


export default router;