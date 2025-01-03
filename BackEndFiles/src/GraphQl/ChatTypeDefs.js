import { gql } from 'apollo-server-express';

export const ChatTypeDefs = gql`
  type Admin {
    id: ID!
    username: String!
    email: String!
  }

  type Message {
    id: ID!
    content: String!
    sender: Admin!
    receiver: Admin!
    timestamp: String!
  }

  type Chat {
    id: ID!
    participants: [Admin!]!
    messages: [Message!]!
    lastMessage: Message
    createdAt: String!
    updatedAt: String!
  }

  input MessageInput {
    content: String!
    receiverId: ID!
  }

  type Query {
    getChat(participantId: ID!): Chat
    getAllChats: [Chat!]!
    getChatMessages(chatId: ID!): [Message!]!
    searchMessages(chatId: ID!, searchTerm: String!): [Message!]!
  }

  type Mutation {
    sendMessage(input: MessageInput!): Message!
    deleteMessage(messageId: ID!): Boolean!
    clearChat(chatId: ID!): Boolean!
  }

  type Subscription {
    messageReceived(chatId: ID!): Message!
    messageSent(chatId: ID!): Message!
    messageDeleted(chatId: ID!): ID!
  }
`;