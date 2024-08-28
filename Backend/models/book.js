import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Number, required: true },
    borrowed: { type: Number, required: true },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;