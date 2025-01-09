import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../Model/User.Model.js';

export const UserResolvers = {
  Mutation: {
    SignUp: async (_, { UserName, Email, Password }) => {
      const existingUser = await UserModel.findOne({ Email });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      const HashedPassword = await bcrypt.hash(Password, parseInt(process.env.SALTROUND));

      const CreateUser = await UserModel.create({ UserName, Email, Password: HashedPassword });

      const token = jwt.sign({ Email }, process.env.CONFIRM_EMAILTOKEN);

      return {
        message: "Success",
        user: CreateUser,
        Token: token,
      };
    },

    SignIn: async (_, { UserName, Password }) => {
      const user = await UserModel.findOne({ UserName });
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = bcrypt.compareSync(Password, user.Password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { id: user._id, role: user.Role },
        process.env.LOGINSIG,
      );

      const formattedUser = {
        id: user._id.toString(),  
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
