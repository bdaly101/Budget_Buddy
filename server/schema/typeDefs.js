const typeDefs = `
  scalar Date

  type Purchase {
    _id: ID!
    cost: Float!
    createdAt: Date!
  }

  type Expense {
    _id: ID!
    name: String!
    purchases: [Purchase]
  }

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    budget: Float
    expenses: [Expense]
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    getExpenses: [Expense]
    getExpenseById(id: ID!): Expense
    getPurchases: [Purchase]
    getPurchaseById(id: ID!): Purchase
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createExpense(name: String!, userId: ID!): Expense
    addPurchase(cost: Float!, expenseId: ID!): Purchase
    updateUser(id: ID!, budget: Float): User
    updateExpense(id: ID!, name: String!): Expense
    updatePurchase(id: ID!, cost: Float!): Purchase
    deleteUser(id: ID!): User
    deleteExpense(id: ID!): Expense
    deletePurchase(id: ID!): Purchase
  }
`;

module.exports = typeDefs;

