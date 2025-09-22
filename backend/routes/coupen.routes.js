import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCoupen, validateCoupen } from "../controllers/coupen.controller.js";
const router = express.Router();


router.get('/',protectRoute,getCoupen);
router.get('/validate',protectRoute,validateCoupen);








export default router