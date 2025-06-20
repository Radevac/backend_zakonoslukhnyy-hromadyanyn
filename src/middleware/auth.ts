import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET as string;
if (!SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

// Middleware для авторизації
export async function authMiddleware(ctx: Context, next: Next) {
    const auth = ctx.headers.authorization;

    if (!auth) {
        ctx.status = 401;
        ctx.body = { error: 'Немає токена' };
        return;
    }

    try {
        const token = auth.split(' ')[1];

        const payload = jwt.verify(token, SECRET) as { id: string };
        if (!payload?.id) {
            ctx.status = 403;
            ctx.body = { error: 'Неправильний токен (немає id)' };
            return;
        }

        ctx.state.user = { id: payload.id };
        await next();
    } catch (err) {
        ctx.status = 403;
        ctx.body = { error: 'Недійсний токен' };
    }
}
