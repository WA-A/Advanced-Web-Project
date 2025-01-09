import ChatModel from '../Model/Chat.Model.js';
import UserModel from '../Model/User.Model.js'; 
export const ChatResolver = {
  Mutation: {
    sendMessage: async (_, { input }, context) => {
      const { user } = context;  
  
      if (!user) {
        throw new Error("Authentication required");
      }
  
      const { content, receiverId } = input;
  
      try {
        const receiver = await UserModel.findById(receiverId);
        if (!receiver) {
          throw new Error("Receiver not found");
        }
  
        const newMessage = {
          content,
          sender: user._id,  
          receiver: receiverId,  
          timestamp: new Date(),
        };
  
        let chat = await ChatModel.findOne({
          participants: { $all: [user._id, receiverId] }
        });
  
        if (!chat) {
          
          chat = new ChatModel({
            participants: [user._id, receiverId],
            messages: [newMessage],
            participantsType: 'User'  
          });
          await chat.save();
        } else {
          chat.messages.push(newMessage);
          await chat.save();
        }

        const messageResponse = {
          content: newMessage.content,
          receiver: {
            id: receiver._id,
            username: receiver.username,
          },
          timestamp: newMessage.timestamp,
        };
  
        pubsub.publish('messageSent', {
          messageSent: messageResponse,
        });
  
        return messageResponse;
      } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Error sending message");
      }
    },
    deleteMessage: async (_, { messageId }, { user, pubsub }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      try {
        const chat = await Chat.findOne({
          'messages._id': messageId
        });

        if (!chat) throw new UserInputError('Message not found');

        const message = chat.messages.id(messageId);
        if (!message) throw new UserInputError('Message not found');

        if (message.sender.toString() !== user.id) {
          throw new AuthenticationError('Not authorized to delete this message');
        }

        message.remove();
        await chat.save();

        pubsub.publish(`MESSAGE_DELETED_${chat.id}`, {
          messageDeleted: messageId
        });

        return true;
      } catch (error) {
        throw new Error('Error deleting message');
      }
    },

   
  },
  Query:{
    getChat: async (_, { participantId }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      try {
        console.log('Fetching chat for user:', user.id, 'with participant:', participantId);
      
        let chat = await ChatModel.findOne({
          participants: { 
            $all: [user.id, participantId]
          }
        }).populate('participants')
          .populate('messages.sender')
          .populate('messages.receiver');
        
        if (!chat) {
          chat = new ChatModel({
            participants: [user.id, participantId],
            messages: [],
            participantsType: 'User', 
          });
          await chat.save();
        }
      
        console.log('Chat fetched:', chat);
    
        chat.participants = ChatModel.participants.map(participant => {
          if (participant instanceof mongoose.Types.ObjectId) {
            return { id: participant.toString() };  
          }
          
          return {
            ...participant.toObject(),
            id: participant._id.toString() 
          };
        });
    
        return chat;
      } catch (error) {
        console.error('Error fetching chat:', error);
        throw new Error('Error fetching chat');
      }
    },
    
 
    getAllChats: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      try {
        const chats = await ChatModel.find({
          participants: user.id
        }).populate('participants')
          .populate('messages.sender')
          .populate('messages.receiver')
          .sort({ updatedAt: -1 });

        return chats;
      } catch (error) {
        throw new Error('Error fetching chats');
      }
    },

    getChatMessages: async (_, { chatId }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      try {
        const chat = await ChatModel.findById(chatId)
          .populate('messages.sender')
          .populate('messages.receiver');

        if (!chat) throw new UserInputError('Chat not found');

        if (!chat.participants.includes(user.id)) {
          throw new AuthenticationError('Not authorized to view this chat');
        }

        return chat.messages;
      } catch (error) {
        throw new Error('Error fetching messages');
      }
    },

    searchMessages: async (_, { chatId, searchTerm }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      try {
        const chat = await ChatModel.findById(chatId);
        if (!chat) throw new UserInputError('Chat not found');

        if (!chat.participants.includes(user.id)) {
          throw new AuthenticationError('Not authorized to search this chat');
        }

        const messages = chat.messages.filter(message => 
          message.content.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return messages;
      } catch (error) {
        throw new Error('Error searching messages');
      }
    }
  },
  // Subscription: {
  //   messageReceived: {
  //     subscribe: withFilter(
  //       (_, __, { pubsub }) => pubsub.asyncIterator('MESSAGE_RECEIVED'),
  //       (payload, variables, { user }) => {
  //         const message = payload.messageReceived;
  //         return message.receiver.toString() === user.id;
  //       }
  //     )
  //   },

  //   messageSent: {
  //     subscribe: withFilter(
  //       (_, __, { pubsub }) => pubsub.asyncIterator('MESSAGE_SENT'),
  //       (payload, variables, { user }) => {
  //         const message = payload.messageSent;
  //         return message.sender.toString() === user.id;
  //       }
  //     )
  //   },

  //   messageDeleted: {
  //     subscribe: withFilter(
  //       (_, { chatId }, { pubsub }) => 
  //         pubsub.asyncIterator(`MESSAGE_DELETED_${chatId}`),
  //       (payload, variables, { user }) => {
  //         return true; // Both participants should see when a message is deleted
  //       }
  //     )
  //   }
  // }
};
