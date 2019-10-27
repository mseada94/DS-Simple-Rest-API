import { Router } from 'express';
import * as products from './products.controller';

const resource = '/products';
const router = Router();


router.route(resource)
    .get(products.getAll)
    .post(products.create);

router.route(resource + '/:id')
    .get(products.get)
    .put(products.replace)
    .patch(products.update)
    .delete(products.remove);

export default  router;
