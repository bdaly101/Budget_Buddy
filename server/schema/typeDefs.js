const typeDefs = `
  scalar Date

  type Purchase {
    _id: ID!
    importance: String!
    createdAt: Date!
  }

  type Expense {
    _id: ID!
    name: String!
    purchases: [Purchase]
  }

  type User {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    money: Float!
    goal: Float!
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
    monthSpending(userId: ID!): Float
  }

  type Mutation {
    addUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!, money: Float!, goal: Float!): User
    login(email: String!, password: String!): AuthPayload
    createExpense(name: String!, userId: ID!): Expense
    createPurchase(importance: String!, expenseId: ID!): Purchase
    updateUser(id: ID!, username: String, firstName: String, lastName: String, email: String, password: String, money: Float, goal: Float): User
    updateExpense(id: ID!, name: String!): Expense
    updatePurchase(id: ID!, importance: String!): Purchase
    deleteUser(id: ID!): User
    deleteExpense(id: ID!): Expense
    deletePurchase(id: ID!): Purchase
  }
`;

module.exports = typeDefs;

