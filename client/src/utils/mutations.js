import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $firstName: String!, $lastName: String!, $email: String!, $budget: Float!) {
    addUser(username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password, budget: $budget) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation createExpense($name: String!, $userId: ID!) {
    createExpense(name: $name, userId: $userId) {
      _id
      name
      purchases {
        _id
        importance
      }
    }
  }
`;

export const ADD_PURCHASE = gql`
  mutation addPurchase($importance: String!, $expenseId: ID!) {
    addPurchase(importance: $importance, expenseId: $expenseId) {
      _id
      importance
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $username: String, $firstName: String, $lastName: String, $email: String, $password: String, $budget: Float) {
    updateUser(id: $id, username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password, budget: $budget) {
      _id
      username
      budget
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($id: ID!, $name: String!) {
    updateExpense(id: $id, name: $name) {
      _id
      name
    }
  }
`;

export const UPDATE_PURCHASE = gql`
  mutation updatePurchase($id: ID!, $importance: String!) {
    updatePurchase(id: $id, importance: $importance) {
      _id
      importance
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id) {
      _id
    }
  }
`;

export const DELETE_PURCHASE = gql`
  mutation deletePurchase($id: ID!) {
    deletePurchase(id: $id) {
      _id
    }
  }
`;
