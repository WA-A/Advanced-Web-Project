import mongoose, { Schema, model } from 'mongoose';

const ChatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'participantsType',  
    required: true
  }],
  participantsType: {
    type: String,
    enum: ['User', 'Admin'], 
    required: true
  },
  messages: [{
    content: {
      type: String,
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming sender is a User type
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming receiver is a User type
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  lastMessage: {
    content: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
    timestamp: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ChatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

ChatSchema.methods.updateLastMessage = function() {
  if (this.messages.length > 0) {
    const lastMsg = this.messages[this.messages.length - 1];
    this.lastMessage = {
      content: lastMsg.content,
      sender: lastMsg.sender,
      receiver: lastMsg.receiver,
      timestamp: lastMsg.timestamp
    };
  }
};

ChatSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.updateLastMessage();
  }
  next();
});

const ChatModel = model('Chat', ChatSchema);
export default ChatModel;
