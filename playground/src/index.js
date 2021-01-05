import { GraphQLServer } from 'graphql-yoga';

// Scalar Types  = String, Boolean, Int, Float, ID

// Demo Data
const users = [
  {
    id: 1,
    name: 'Conary',
    email: 'Conary@example.com',
    age: 25,
  },
  {
    id: 2,
    name: 'Sara',
    email: 'Sara@example.com',
    age: 30,
  },
  {
    id: 3,
    name: 'John',
    email: 'John@example.com',
    age: 20,
  },
];

const posts = [
  {
    id: 1,
    title: 'First Post',
    body: 'this is a post 1',
    published: 25,
    author: 1,
  },
  {
    id: 2,
    title: 'second Post',
    body: 'this is a post 2',
    apublishedge: 30,
    author: 1,
  },
  {
    id: 3,
    title: 'third Post',
    body: 'this is a post 3',
    published: 20,
    author: 2,
  },
];

const comments = [
  {
    id: 'comment-1',
    text: 'First Comment',
    author: 1,
    post: 1,
  },
  {
    id: 'comment-2',
    text: 'second Comment',
    author: 1,
    post: 1,
  },
  {
    id: 'comment-3',
    text: 'third Comment',
    author: 3,
    post: 1,
  },
  {
    id: 'comment-4',
    text: 'forth Comment',
    author: 3,
    post: 1,
  },
];

// type definitions
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
    comments(parent, args, ctx, info) {
      return comments || [];
    },
    me() {
      return {
        id: '123456',
        name: 'conary',
        email: 'conary@example.com',
        age: 25,
      };
    },
    post() {
      return {
        id: 'post-1',
        title: 'My first post',
        body: "I'm writing my first post",
        published: true,
      };
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
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
