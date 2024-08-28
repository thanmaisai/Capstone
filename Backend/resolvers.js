import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './models/user.js';
import jwt from 'jsonwebtoken';
import Book from './models/book.js';

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (_, { _id }) => {
            return await User.findById(_id);
        },
        books: async () => {
            return await Book.find();
        },
        book: async (_, { _id }) => {
            return await Book.findById(_id);
        },
    },
    Mutation: {
        signupUser: async (_, { userNew }) => {
            try {
                const user = await User.findOne({ email: userNew.email });
                if (user) {
                    throw new Error("User already exists with that email");
                }
                const hashed_password = await bcrypt.hash(userNew.password, 12);
                const newUser = new User({
                    ...userNew,
                    password: hashed_password
                });
                await newUser.save();
                return newUser;
            } catch (error) {
                console.error("Error signing up user:", error);
                throw new Error("Error signing up user");
            }
        },
        signinUser: async (_, { userSignin }) => {
            const user = await User.findOne({ email: userSignin.email });
            if (!user) {
                throw new Error("User doesn't exist with that email");
            }
            const doMatch = await bcrypt.compare(userSignin.password, user.password);
            if (!doMatch) {
                throw new Error("Email or password is invalid");
            }
            const token = jwt.sign({ userId: user._id ,role:user.role }, process.env.JWT_SECRET);
            return { token , role:user.role};
        },
        addBook: async (_, { bookInput }) => {
            try {
                const newBook = new Book(bookInput);
                await newBook.save();
                return newBook;
            } catch (error) {
                console.error("Error adding book:", error);
                throw new Error("Error adding book");
            }
        },
        updateBook: async (_, { _id, bookInput }) => {
            try {
                const updatedBook = await Book.findByIdAndUpdate(_id, bookInput, { new: true });
                if (!updatedBook) {
                    throw new Error("Book not found");
                }
                return updatedBook;
            } catch (error) {
                console.error("Error updating book:", error);
                throw new Error("Error updating book");
            }
        },
        deleteBook: async (_, { _id }) => {
            try {
                const deletedBook = await Book.findByIdAndDelete(_id);
                if (!deletedBook) {
                    throw new Error(`Book with ID ${_id} not found`);
                }
                return deletedBook;
            } catch (error) {
                console.error("Error deleting book:", error);
                throw new Error(error.message || "Error deleting book");
            }
        },
        borrowBook: async (_, { _id }) => {
            try {
                const book = await Book.findById(_id);
                if (!book) {
                    throw new Error("Book not found");
                }
                if (book.available <= 0) {
                    throw new Error("No copies available to borrow");
                }

                // Update book counts
                book.available -= 1;
                book.borrowed += 1;
                book.isBorrowed = true;
                await book.save();

                return book;
            } catch (error) {
                console.error("Error borrowing book:", error);
                throw new Error("Error borrowing book");
            }
        }
    }
};

export default resolvers;
