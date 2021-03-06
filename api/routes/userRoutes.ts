import * as express from 'express';
import * as controller from '../controller/user';

const router = express.Router();

// Routes
router.get('/', controller.fetchUsersInGroup);


export default router;