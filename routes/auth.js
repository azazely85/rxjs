import Controller from '../controllers/auth';
import express from 'express';
const router = express.Router();

router.route('/login')
.post(Controller.login);
router.post('/register', Controller.register);

export default router;
