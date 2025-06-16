import { IsString, MinLength, IsOptional, IsUrl, IsNumber } from 'class-validator';

export class PostDto {
    @IsString()
    @MinLength(1)
    title!: string;

    @IsString()
    @MinLength(1)
    text!: string;

    @IsOptional()
    @IsUrl()
    image?: string;
    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;
}
