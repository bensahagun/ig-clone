import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    signUp(idToken: String): AuthPayload
    signIn(idToken: String): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    uid: String
    email: String
    displayName: String
    phoneNumber: String
  }
`;
export default typeDefs;
