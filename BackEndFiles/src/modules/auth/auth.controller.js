import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../../Model/User.Model.js';

export const resolvers = {
  Mutation: {
    SignUp: async (_, { UserName, Email, Password }) => {
      const HashedPassword = bcrypt.hashSync(Password, parseInt(process.env.SALTROUND));
      const CreateUser = await UserModel.create({ UserName, Email, Password: HashedPassword });
      const token = jwt.sign({ Email }, process.env.CONFIRM_EMAILTOKEN);
      return { message: "Success", user: CreateUser, Token: token };
    },
    SignIn: async (_, { UserName, Password }) => {
      const user = await UserModel.findOne({ UserName });
      if (!user || !bcrypt.compareSync(Password, user.Password)) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: user._id, role: user.Role }, process.env.LOGINSIG);
      return { message: "Success", Token: token, user };
    },
  },
};
