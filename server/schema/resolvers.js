const { User, Expense, Purchase } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find().populate('expenses');
    },
    getUserById: async (parent, { id }) => {
      return User.findById(id).populate('expenses');
    },
    getExpenses: async () => {
      return Expense.find();
    },
    getExpenseById: async (parent, { id }) => {
      return Expense.findById(id);
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('expenses');
      }
      throw new AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, budget }) => {
      // Set a default value for budget
      const userBudget = 0;
      try {
        
        const user = await User.create({ username, email, password, budget: userBudget });
        console.log(user);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        
        throw new Error('Error creating user');
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address.');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }

      const token = signToken(user);
      return { token, user };
    },
    createExpense: async (parent, { name, userId }) => {
      const expense = await Expense.create({ name, user: userId });
      await User.findByIdAndUpdate(userId, { $push: { expenses: expense._id } });
      return expense;
    },
    
    updateUser: async (parent, { id, budget }) => {
      return User.findByIdAndUpdate(id, { budget }, { new: true });
    },
    updateExpense: async (parent, { id, name }) => {
      return Expense.findByIdAndUpdate(id, { name }, { new: true });
    },
    
    deleteUser: async (parent, { id }) => {
      return User.findByIdAndDelete(id);
    },
    deleteExpense: async (parent, { id }) => {
      return Expense.findByIdAndDelete(id);
    },
    
  },
};

module.exports = resolvers;
