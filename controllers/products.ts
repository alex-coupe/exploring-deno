import {Product} from '../types.ts';

let products : Array<Product> = [
    {
        id: 1245,
        name: "Product One",
        description: "This is product one",
        price: 23.99,
        slug: "product-one"
    },
    {
        id: 1300,
        name: "Product Two",
        description: "This is product two",
        price: 15.75,
        slug: "product-two"
    },
    {
        id: 1111,
        name: "Product Three",
        description: "This is product three",
        price: 8.99,
        slug: "product-three"
    }
]

// @desc    Get all products
// @route   GET /api/v1/products

const getProducts = ({response}: {response:any}) => {
    response.body = {
        success:true,
        data: products
    }
}

// @desc    Get single product
// @route   GET /api/v1/products/:slug

const getProduct = ({response, params}: {response:any, params: {slug: string}}) => {
   const product : Product | undefined = products.find(p => p.slug == params.slug);

   if (product) {
       response.status = 200
       response.body = {
           success: true,
           data: product
       }
   } else {
    response.status = 404
    response.body = {
        success: false,
        error: "Product Not Found"
    }
   }
}

// @desc    Add product
// @route   POST /api/v1/products

const addProduct = async ({request,response}: {request: any, response:any}) => {
   const body:any = await request.body();

   if (!request.hasBody) {
       response.status = 400
       response.body = {
           success: false,
           error: 'Bad Request'
       } 
    } else {
        const product: Product = body.value
        console.log(product);
        product.id = products.length+1;
        products.push(product);
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

// @desc    Update product
// @route   PUT /api/v1/products/:slug

const updateProduct = async ({response, request, params}: {response:any, request:any, params: {slug: string}}) => {
    const product : Product | undefined = products.find(p => p.slug == params.slug);

    if (product) {

        const body = await request.body();

        const updateData : Partial<Product> = body.value;

        products = products.map(p => p.slug === params.slug ? {...p, ...updateData}: p);

        response.status = 200
        response.body = {
            success: true,
            data: product
        }

    } else {
        response.status = 404
        response.body = {
            success: false,
            error: 'Product Not Found'
        } 
    }
}

// @desc    Delete product
// @route   DELETE /api/v1/products/:slug

const deleteProduct = ({ params, response }: { params: { slug: string }, response: any }) => {
    products = products.filter(p => p.slug !== params.slug)
    response.body = { 
        success: true
    }
}



export {getProducts, getProduct, addProduct, updateProduct, deleteProduct}