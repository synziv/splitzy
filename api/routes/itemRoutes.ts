import * as express from 'express';
import * as controller from '../controller/item';

const router = express.Router();

// Routes
router.post('/', controller.addItem);
router.get('/', controller.fetchItems);
router.delete('/', controller.deleteItem);
router.get('/x', (req,res)=>{res.send('auth routes')});


export default router;