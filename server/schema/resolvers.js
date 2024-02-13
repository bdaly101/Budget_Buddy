const { User, Expense, Purchase } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

async function calculateSpendingForPeriod(userId, startDate, endDate) {
  const query = { user: userId };
  if (startDate && endDate) {
    query.createdAt = { $gte: startDate, $lte: endDate };
  }
  
  const expenses = await Expense.find(query);
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find().populate('expenses');
    },
    getUserById: async (parent, { id }) => {
      return User.findById(id).populate('expenses');
    },
    getExpenses: async () => {
      return Expense.find().populate('purchases');
    },
    getExpenseById: async (parent, { id }) => {
      return Expense.findById(id).populate('purchases');
    },
    getPurchases: async () => {
      return Purchase.find();
    },
    getPurchaseById: async (parent, { id }) => {
      return Purchase.findById(id);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
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
    addPurchase: async (parent, { cost, expenseId }) => {
      const purchase = await Purchase.create({ cost, expense: expenseId });
      await Expense.findByIdAndUpdate(expenseId, { $push: { purchases: purchase._id } });
      return purchase;
    },
    updateUser: async (parent, { id, ...args }) => {
      return User.findByIdAndUpdate(id, args, { new: true });
    },
    updateExpense: async (parent, { id, name }) => {
      return Expense.findByIdAndUpdate(id, { name }, { new: true });
    },
    updatePurchase: async (parent, { id, cost }) => {
      return Purchase.findByIdAndUpdate(id, { cost }, { new: true });
    },
    deleteUser: async (parent, { id }) => {
      return User.findByIdAndDelete(id);
    },
    deleteExpense: async (parent, { id }) => {
      return Expense.findByIdAndDelete(id);
    },
    deletePurchase: async (parent, { id }) => {
      return Purchase.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
