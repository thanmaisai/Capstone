/* This JavaScript code snippet is setting up an Apollo Server for a GraphQL API. Here's a breakdown of
what each part of the code is doing: */
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './schemaGql.js';
import resolvers from './resolvers.js';
import User from './models/user.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const { MONGO_URI, JWT_SECRET } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
});

// Context function to handle JWT
const context = ({ req }) => {
    const { authorization } = req.headers;

    if (authorization) {
        try {
            const { userId } = jwt.verify(authorization.replace('Bearer ', ''), JWT_SECRET);
            return { userId };
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
    
    return {};
};

// Apollo Server
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
