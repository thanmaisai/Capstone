import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './models/user.js';

const resolvers = {
    Query: {
        users: async () => {
            return await User.find(); 
        },
        user: async (_, { _id }) => {
            return await User.findById(_id);
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
        }
    }
};

export default resolvers;
