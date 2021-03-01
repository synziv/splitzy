import * as express from 'express';
import * as controller from '../controller/group';

const router = express.Router();

// Routes
router.post('/group', controller.createGroup);
router.get('/x', (req,res)=>{res.send('auth routes')});


export default router;