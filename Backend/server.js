import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import typeDefs from './schemaGql.js'

import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();
import jwt from 'jsonwebtoken'

// mongoDb
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
});

import resolvers from './resolvers.js'
import User from './models/user.js';
const context = ({ req }) => {
    const { authorization } = req.headers;
  
    if (authorization) {
      const { userId } = jwt.verify(authorization, JWT_SECRET);
  
      return { userId };
    }
  }
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