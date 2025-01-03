// server.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import connectDB from './DB/ConnectDB.js';
import { typeDefs } from './src/GraphQl/typeDefs.js';
import { resolvers } from './src/GraphQl/resolvers.js';
import jwt from 'jsonwebtoken';
import UserModel from './src/Model/User.Model.js';
import { PubSub } from 'graphql-subscriptions';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        // Get the operation from the request
        const operation = req.body.query || '';
        
        // Allow SignUp and SignIn without authentication
        if (operation.includes('SignUp') || operation.includes('SignIn')) {
            return { pubsub };  // Ensure pubsub is included in the context
        }

        try {
            // For all other operations, verify the token
            const authorization = req.headers.authorization;
            
            if (!authorization) {
                throw new Error('Authentication required');
            }

            if (!authorization.startsWith(process.env.BEARERKEY)) {
                throw new Error('Invalid token format');
            }

            const token = authorization.split(process.env.BEARERKEY)[1];
            const decoded = jwt.verify(token, process.env.LOGINSIG);

            if (!decoded) {
                throw new Error('Invalid token');
            }

            const user = await UserModel.findById(decoded.id).select('UserName Role');
            
            if (!user) {
                throw new Error('User not found');
            }

            return { user, pubsub };  // Pass pubsub along with user
        } catch (error) {
            // For non-auth operations, throw the error
            if (!operation.includes('SignUp') && !operation.includes('SignIn')) {
                throw error;
            }
            // For auth operations, return empty context
            return { pubsub };
        }
    },
});


await server.start();
server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
});