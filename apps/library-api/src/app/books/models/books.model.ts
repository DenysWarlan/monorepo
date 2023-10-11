import mongoose from 'mongoose';

export interface Book extends mongoose.Document {
    readonly userId: string;
    readonly title: string;
    readonly authors: string[];
    readonly publisher: string;
    readonly description: string;
    readonly categories: string[];
    readonly thumbnail: string;
}

export const BookSchema: mongoose.Schema<Book> = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    authors: [{ type: String }],
    publisher: { type: String},
    description: { type: String},
    categories: [{ type: String}],
    thumbnail: { type: String},
});