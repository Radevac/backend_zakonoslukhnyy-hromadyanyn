import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MinLength(3, { message: 'Імʼя користувача має містити щонайменше 3 символи' })
    username!: string;

    @IsString()
    @MinLength(4,  { message: 'Пароль має містити щонайменше 4 символи' })
    password!: string;
}
