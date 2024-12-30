import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/ConnectDB.js';
import { typeDefs } from './src/GraphQl/typeDefs.js'; 
import { resolvers } from './src/GraphQl/resolvers.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs, // مرر التعريفات المدمجة
  resolvers, // مرر الـ resolvers المدمجة
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
});

await server.start();
server.applyMiddleware({ app });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
});
