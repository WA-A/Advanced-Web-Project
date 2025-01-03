import ChatModel from '../Model/Chat.Model.js';
import UserModel from '../Model/User.Model.js'; // Assuming User model exists

export const ChatResolver = {
  Mutation: {
    sendMessage: async (_, { input }, context) => {
      const { user } = context;  // user will be fetched from token in context
  
      if (!user) {
        throw new Error("Authentication required");
      }
  
      const { content, receiverId } = input;
  
      try {
        // Ensure the receiverId is valid
        const receiver = await UserModel.findById(receiverId);
        if (!receiver) {
          throw new Error("Receiver not found");
        }
  
        // Prepare the new message
        const newMessage = {
          content,
          sender: user._id,  // sender is determined from the user (from token)
          receiver: receiverId,  
          timestamp: new Date(),
        };
  
        // Find the chat between the sender and receiver
        let chat = await ChatModel.findOne({
          participants: { $all: [user._id, receiverId] }
        });
  
        if (!chat) {
          // If no chat exists, create a new one and add participantsType as 'User'
          chat = new ChatModel({
            participants: [user._id, receiverId],
            messages: [newMessage],
            participantsType: 'User'  // Set the participantsType to 'User'
          });
          await chat.save();
        } else {
          // If chat exists, just add the new message
          chat.messages.push(newMessage);
          await chat.save();
        }

        // Return the new message along with receiver details
        const messageResponse = {
          content: newMessage.content,
          receiver: {
            id: receiver._id,
            username: receiver.username,
          },
          timestamp: newMessage.timestamp,
        };
  
        // Publish the new message if you're using PubSub
        pubsub.publish('messageSent', {
          messageSent: messageResponse,
        });
  
        return messageResponse;
      } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Error sending message");
      }
    },
  },
 
};
