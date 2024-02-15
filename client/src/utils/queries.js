import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      budget
      expenses {
        _id
        name
        cost
        createdAt
      }
    }
  }
`;



export const QUERY_EXPENSES = gql`
  query expenses {
    getExpenses {
      _id
      name
     cost
     createdAt
    }
  }
`;

export const QUERY_EXPENSE_BY_ID = gql`
  query expenseById($id: ID!) {
    getExpenseById(id: $id) {
      _id
      name
      cost
      createdAt
    }
  }
`;

