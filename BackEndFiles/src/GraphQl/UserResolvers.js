import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../Model/User.Model.js';

export const UserResolvers = {
  Mutation: {
    // SignUp Mutation
    SignUp: async (_, { UserName, Email, Password }) => {
      // Check if the email is already in use
      const existingUser = await UserModel.findOne({ Email });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      // Hash the password
      const HashedPassword = await bcrypt.hash(Password, parseInt(process.env.SALTROUND));

      // Create the user
      const CreateUser = await UserModel.create({ UserName, Email, Password: HashedPassword });

      // Generate a confirmation token
      const token = jwt.sign({ Email }, process.env.CONFIRM_EMAILTOKEN);

      return {
        message: "Success",
        user: CreateUser,
        Token: token,
      };
    },

    // SignIn Mutation
    SignIn: async (_, { UserName, Password }) => {
      // Find the user by username
      const user = await UserModel.findOne({ UserName });
      if (!user) {
        throw new Error('User not found');
      }

      // Validate the password
      const isValidPassword = bcrypt.compareSync(Password, user.Password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      // Generate a login token
      const token = jwt.sign(
        { id: user._id, role: user.Role },
        process.env.LOGINSIG,
      );

      // Format user object to match GraphQL schema exactly
      const formattedUser = {
        id: user._id.toString(),  // تحويل ObjectId إلى string
        UserName: user.UserName,
        Role: user.Role
      };

      return {
        message: "Success",
        Token: token,
        user: formattedUser
      };
    }
  },
};
