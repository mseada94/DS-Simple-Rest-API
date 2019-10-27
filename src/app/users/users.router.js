import { Router } from 'express';
import { getAll, create } from './users.controller';
import { hidePassword, encryptPassword } from './middlewares';
import { roles } from '../auth/middlewares';
const resource = '/users';

const router = Router();
const route = Router();

route.use(encryptPassword);

route.route('')
    .get(roles('admin'), getAll)
    .post(create);

route.use(hidePassword);

router.use(resource, route);

export default  router;
