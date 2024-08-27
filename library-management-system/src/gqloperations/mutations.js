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
