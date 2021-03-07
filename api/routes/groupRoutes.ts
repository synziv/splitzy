import * as express from 'express';
import * as controller from '../controller/group';

const router = express.Router();

// Routes
router.post('/', controller.createGroup);
router.get('/', controller.fetchUserGroups);
router.get('/x', (req,res)=>{res.send('auth routes')});


export default router;