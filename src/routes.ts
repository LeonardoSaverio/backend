import { Router, Request, Response } from 'express';
import multer from "multer";

import authMiddlewareFirebase from './middleware/authMiddlewareFirebase';

import UserController from './controllers/UserController';
import ProductController from './controllers/ProductController';
import MyProductController from './controllers/MyProductController';

const upload = multer();
const router = Router();

router.post('/register', UserController.create);

router.post('/product',  upload.array('images'), ProductController.create);
router.get('/product', ProductController.index)
router.get('/product/:id', ProductController.show)
router.patch('/product/:id', ProductController.update)
router.delete('/product/:id', ProductController.delete)

router.get('/my-product', MyProductController.index)



router.get('/home', authMiddlewareFirebase.decodeToken, (request: Request, response: Response) => {
    console.log(request.user)
    return response.json({
        message: "home com middleware"
    })
})

router.get('/home2', (request: Request, response: Response) => {
    console.log(request.user)
    return response.json({
        message: "home sem middleware"
    })
})


export default router;
