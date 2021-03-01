import authRoutes from "./authRoutes";
import  express from "express";
const router = express.Router();

/* GET home page. */
router.use('/auth', authRoutes);
router.get('/x', (req,res)=>{res.send('holaaaaaaaaaa')});

export default router;
