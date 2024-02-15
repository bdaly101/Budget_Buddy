const typeDefs = `
  scalar Date

  
  type Expense {
    _id: ID!
    name: String!
    cost: Float!
    createdAt: Date!
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
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createExpense(name: String!, cost: Float! userId: ID!): Expense
    
    updateUser(id: ID!, budget: Float): User
    updateExpense(id: ID!, name: String, cost: Float): Expense
    
    deleteUser(id: ID!): User
    deleteExpense(id: ID!): Expense
    
  }
`;

module.exports = typeDefs;

