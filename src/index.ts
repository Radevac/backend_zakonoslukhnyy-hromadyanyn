import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import cors from '@koa/cors';

import authRoutes from './routes/auth';
import postRoutes from './routes/posts';

const app = new Koa();
const router = new Router();

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/auth_app_project')
    .then(() => console.log('✅ MongoDB підключено'))
    .catch(err => console.error('❌ MongoDB помилка', err));

app.use(cors());
app.use(bodyParser());

// Реєструємо маршрути
router.use('/auth', authRoutes.routes());
router.use('/posts', postRoutes.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('🚀 Сервер запущено на http://localhost:3000');
});
