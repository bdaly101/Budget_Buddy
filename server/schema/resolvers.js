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
    calculateDailySpending: async (parent, { userId }, context) => {
      // Ensure user is authenticated and authorized
      // Example implementation, adjust according to your authentication logic
      if (!context.user || context.user._id !== userId) {
        throw new AuthenticationError('Unauthorized');
      }
  
      // Get today's date range
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
  
      return calculateSpendingForPeriod(userId, todayStart, todayEnd);
    },
  
    
    monthSpending: async (parent, { userId }, context) => {
      try {
        // Assuming context.user._id is available through your authentication middleware
        if (!context.user || context.user._id !== userId) {
          throw new AuthenticationError('You are not authorized to perform this action');
        }
  
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }
  
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const expenses = await Expense.find({
          user: userId,
          createdAt: { $gte: startOfMonth }
        });
  
        const totalMonthlyExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const amountAfterGoals = user.money - user.goal;
        const monthBudget = (amountAfterGoals - totalMonthlyExpenses) / 4;
  
        return monthBudget;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to calculate monthly spending');
      }
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
    createPurchase: async (parent, { importance, expenseId }) => {
      const purchase = await Purchase.create({ importance, expense: expenseId });
      await Expense.findByIdAndUpdate(expenseId, { $push: { purchases: purchase._id } });
      return purchase;
    },
    updateUser: async (parent, { id, ...args }) => {
      return User.findByIdAndUpdate(id, args, { new: true });
    },
    updateExpense: async (parent, { id, name }) => {
      return Expense.findByIdAndUpdate(id, { name }, { new: true });
    },
    updatePurchase: async (parent, { id, importance }) => {
      return Purchase.findByIdAndUpdate(id, { importance }, { new: true });
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
