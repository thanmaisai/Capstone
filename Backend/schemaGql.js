import { gql } from "apollo-server"

const typeDefs = gql`
 type Query {
    users: [User]
    user(_id: ID!): User
    books: [Book]
    book(_id: ID!): Book
 }

 type User {
     _id: ID!
     firstName: String!
     lastName: String!
     email: String!
     password: String!
     role: String!
 }

 type Token {
    token: String
    role: String
 }

 type Book {
    _id: ID!
    title: String!
    author: String!
    category: String!
    image: String!
    available: Int!
    borrowed: Int!
    isBorrowed: Boolean!  # New field to track borrowing status
 }

 type Mutation {
     signupUser(userNew: UserInput!): User
     signinUser(userSignin: UserSigninInput!): Token
     addBook(bookInput: BookInput!): Book
     updateBook(_id: ID!, bookInput: BookInput!): Book
     deleteBook(_id: ID!): Book
     borrowBook(_id: ID!): Book  # New mutation for borrowing a book
 }

 input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
 }

 input UserSigninInput {
    email: String!
    password: String!
 }

 input BookInput {
    title: String!
    author: String!
    category: String!
    image: String!
    available: Int!
    borrowed: Int!
 }
`

export default typeDefs
