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
  mutation createExpense($name: String!, $cost: Float!, $userId: ID!) {
    createExpense(name: $name, cost: $cost, userId: $userId) {
      _id
      name
      cost
      createdAt
      
    }
  }
`;



export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $budget: Float) {
    updateUser(id: $id, budget: $budget) {
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



