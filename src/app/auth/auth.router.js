import { Router } from 'express';
import { login } from './auth.controller';
const router = Router();


router.route('/auth')
    .post(login);

export default  router;
