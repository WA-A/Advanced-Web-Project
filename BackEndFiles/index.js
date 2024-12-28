// index.js
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/ConnectDB.js'; 
import { typeDefs } from './src/GraphQl/typeDefs.js';
import { resolvers } from './src/GraphQl/resolvers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
});
