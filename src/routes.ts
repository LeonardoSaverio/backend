import { Router, Request, Response } from 'express';
import multer from "multer";
import multerConfig from './config/multer'; 

import authMiddlewareFirebase from './middleware/authMiddlewareFirebase';

import UserController from './controllers/UserController';
import ProductController from './controllers/ProductController';
import MyProductController from './controllers/MyProductController';

const router = Router();
router.use(authMiddlewareFirebase.decodeToken)
const upload = multer(multerConfig);

router.post('/register', UserController.create);

router.post('/product', upload.array('images'), ProductController.create);
router.get('/product',  ProductController.index);
router.get('/product/:id', ProductController.show);
router.patch('/product/:id', upload.array('images'), ProductController.update);
router.delete('/product/:id', ProductController.delete);

router.get('/myproduct', MyProductController.index);


export default router;
