"use strict";

var _graphqlYoga = require("graphql-yoga");

// Scalar Types  = String, Boolean, Int, Float, ID
// type definitions
const typeDefs = "\n  type Query {\n    id: ID!\n    name: String!\n    age: Int!\n    employed: Boolean!\n    gpa: Float\n  }    \n"; // Resolvers

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
    }

  }
};
const server = new _graphqlYoga.GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => {
  console.log('The Server is running!');
});