import { gql } from '@apollo/client';

export const QUERY_PURCHASES = gql`
  query purchases {
    getPurchases {
      _id
      importance
      createdAt
    }
  }
`;

export const QUERY_EXPENSES = gql`
  query expenses {
    getExpenses {
      _id
      name
      purchases {
        _id
        importance
        createdAt
      }
    }
  }
`;

export const QUERY_EXPENSE_BY_ID = gql`
  query expenseById($id: ID!) {
    getExpenseById(id: $id) {
      _id
      name
      purchases {
        _id
        importance
        createdAt
      }
    }
  }
`;

// Adding a query for a single purchase by its ID, assuming you need it based on your typeDefs
export const QUERY_PURCHASE_BY_ID = gql`
  query purchaseById($id: ID!) {
    getPurchaseById(id: $id) {
      _id
      importance
      createdAt
    }
  }
`;
