import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    username: String
    fullName: String
  }
`;
export default typeDefs;
