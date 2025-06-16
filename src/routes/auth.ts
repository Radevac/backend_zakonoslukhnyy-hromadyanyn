import Router from 'koa-router';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { RegisterDto } from '../dto/RegisterDto';
import { LoginDto } from '../dto/LoginDto';
import { validateDto } from '../utils/validateDto';
import dotenv from 'dotenv';
dotenv.config();

const router = new Router();
const SECRET = process.env.JWT_SECRET as string;
if (!SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

// Реєстрація
router.post('/register', validateDto(RegisterDto), async ctx => {
    const { username, password } = ctx.request.body as RegisterDto;
    const existing = await User.findOne({ username });
    if (existing) {
        ctx.status = 400;
        ctx.body = { error: 'Користувач існує' };
        return;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();
    ctx.body = { message: 'Зареєстровано' };
});

// Логін
router.post('/login', validateDto(LoginDto), async ctx => {
    const { username, password } = ctx.request.body as LoginDto;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        ctx.status = 401;
        ctx.body = { error: 'Невірні дані' };
        return;
    }

    const token = jwt.sign({ id: user._id }, SECRET);
    ctx.body = { token };
});

export default router;
