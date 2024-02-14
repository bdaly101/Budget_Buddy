import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
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
        cost
        createdAt
      }
    }
  }
`;

export const ADD_PURCHASE = gql`
  mutation addPurchase($cost: Float!, $expenseId: ID!) {
    addPurchase(cost: $cost, expenseId: $expenseId) {
      _id
      cost
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $username: String,  $email: String, $password: String) {
    updateUser(id: $id, username: $username, email: $email, password: $password) {
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
  mutation updatePurchase($id: ID!, $cost: Float!) {
    updatePurchase(id: $id, cost: $cost) {
      _id
      cost
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
