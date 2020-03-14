import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import BookController from './app/controllers/BookController';
import BookmarkController from './app/controllers/BookmarkController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// Middleware global de autenticação
routes.use(authMiddleware);

// Users
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Files
routes.post('/files', upload.single('file'), FileController.store);

// Books
routes.get('/books', BookController.index);
routes.post('/books', BookController.store);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.delete);

// Bookmarks
routes.get('/bookmarks', BookmarkController.index);
routes.post('/bookmarks', BookmarkController.store);

export default routes;
