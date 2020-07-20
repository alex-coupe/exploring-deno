import {Router} from 'https://deno.land/x/oak/mod.ts'
import {getProducts, getProduct, addProduct, updateProduct, deleteProduct} from './controllers/products.ts'
const router : Router = new Router();

router.get('/api/v1/products', getProducts)
.get('/api/v1/products/:slug', getProduct)
.post('/api/v1/products', addProduct)
.put('/api/v1/products/:slug', updateProduct)
.delete('/api/v1/products/:slug', deleteProduct)

export default router;