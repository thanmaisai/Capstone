import { gql } from '@apollo/client';

// Mutation for signing up a new user
export const SIGNUP_USER = gql`
    mutation signupUser($userNew: UserInput!) {
        signupUser(userNew: $userNew) {
            _id
            firstName
            lastName
            email
            role
        }
    }
`;

// Mutation for logging in a user
export const LOGIN_USER = gql`
    mutation signinUser($userSignin: UserSigninInput!) {
        signinUser(userSignin: $userSignin) {
            token
            role
        }
    }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation AddBook(
    $title: String!,
    $author: String!,
    $category: String!,
    $image: String!,
    $available: Int!,
    $borrowed: Int!
  ) {
    addBook(bookInput: {
      title: $title,
      author: $author,
      category: $category,
      image: $image,
      available: $available,
      borrowed: $borrowed
    }) {
      _id
      title
      author
      category
      image
      available
      borrowed
    }
  }
`;

export const GET_BOOKS = gql`
  query {
    books {
      _id
      title
      author
      category
      image
      available
      borrowed
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($_id: ID!) {
    deleteBook(_id: $_id) {
      _id
      title
      author
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $_id: ID!,
    $title: String!,
    $author: String!,
    $category: String!,
    $image: String!,
    $available: Int!,
    $borrowed: Int!
  ) {
    updateBook(
      _id: $_id,
      bookInput: {
        title: $title,
        author: $author,
        category: $category,
        image: $image,
        available: $available,
        borrowed: $borrowed
      }
    ) {
      _id
      title
      author
      category
      image
      available
      borrowed
    }
  }
`;
