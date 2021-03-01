import authRoutes from "./authRoutes";
import  express from "express";
import groupRoutes from "./groupRoutes";
import itemRoutes from "./itemRoutes";
const router = express.Router();

/* GET home page. */
router.use('/auth', authRoutes);
router.use('/group', groupRoutes);
router.use('/item', itemRoutes);
// router.use('/user', userRoutes);

export default router;
