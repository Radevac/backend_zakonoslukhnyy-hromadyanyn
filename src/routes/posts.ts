import Router from 'koa-router';
import { Post } from '../models/Post';
import { authMiddleware } from '../middleware/auth';
import { validateDto } from '../utils/validateDto';
import { PostDto } from '../dto/PostDto';
import { UserDocument } from '../models/User';

const router = new Router();

// Отримати всі пости
router.get('/', async ctx => {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });

    ctx.body = posts.map(post => ({
        id: post._id,
        title: post.title,
        text: post.text,
        image: post.image,
        latitude: post.latitude,
        longitude: post.longitude,
        author: (post.author as UserDocument)?.username || 'Невідомо',
        createdAt: post.createdAt,
    }));
});

// Створити пост (авторизовано)
router.post('/', authMiddleware, validateDto(PostDto), async ctx => {
    const { title, text, image, latitude, longitude } = ctx.request.body as PostDto;
    const userId = ctx.state.user.id;

    const post = new Post({
        title,
        text,
        author: userId,
        image,
        latitude,
        longitude
    });

    await post.save();
    ctx.body = { message: 'Пост створено' };
});

// Видалити пост (авторизовано)
router.delete('/:id', authMiddleware, async ctx => {
    const { id } = ctx.params;

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
        ctx.status = 404;
        ctx.body = { message: 'Пост не знайдено' };
        return;
    }

    ctx.body = { message: 'Пост видалено' };
});

export default router;
