import { gql } from "apollo-server"

const typeDefs = gql`
 type Query {
    users: [User]
    user(id: ID!): User
 }

 type User {
     id: ID!
     firstName: String
     lastName: String
     email: String
     password: String
     role: String
 }

 type Mutation {
     signupUser(userNew: UserInput!): User
 }

 input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
 }
`
export default typeDefs
