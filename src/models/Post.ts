import mongoose, { Document, Types } from 'mongoose';
import { UserDocument } from './User';

export interface PostDocument extends Document {
    title: string;
    text: string;
    author: Types.ObjectId | UserDocument;
    image: string;
    latitude?: number;
    longitude?: number;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema<PostDocument>({
    title: String,
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: { type: String, required: true },
    latitude: Number,
    longitude: Number
}, { timestamps: true });

export const Post = mongoose.model<PostDocument>('Post', postSchema);
