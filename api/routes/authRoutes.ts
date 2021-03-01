import * as express from 'express';
import * as controller from '../controller/auth';

const router = express.Router();

// Routes
router.post('/facebook', controller.facebookAuth);
router.get('/x', (req,res)=>{res.send('auth routes')});


export default router;