import { GraphQLServer } from 'graphql-yoga';

// Scalar Types  = String, Boolean, Int, Float, ID

// type definitions
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }    
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return '123456';
    },
    name() {
      return 'Conary Hernandez!';
    },
    age() {
      return 25;
    },
    employed() {
      return true;
    },
    gpa() {
      return 25.5;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('The Server is running!');
});
