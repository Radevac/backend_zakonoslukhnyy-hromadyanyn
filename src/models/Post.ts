import mongoose from 'mongoose';

// Схема поста
const postSchema = new mongoose.Schema({
    title: String,
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
});

export const Post = mongoose.model('Post', postSchema);
