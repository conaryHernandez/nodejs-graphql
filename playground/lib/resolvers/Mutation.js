"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Mutation = {
  createUser(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    const emailTaken = db.users.some(user => user.email === args.data.email);

    if (emailTaken) {
      throw new Error('Email Taken.');
    }

    const user = _objectSpread({
      id: (0, _v.default)()
    }, args.data);

    db.users.push(user);
    return user;
  },

  deleteUser(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    const userIndex = db.users.findIndex(user => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('User Not found!');
    }

    const deletedUsers = db.users.splice(userIndex, 1);
    db.posts = db.posts.filter(post => {
      const match = post.author !== args.id;

      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id);
      }

      return !match;
    });
    db.comments = db.comments.filter(comment => comment.author !== args.id);
    return deletedUsers[0];
  },

  createPost(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    const userExists = db.users.some(user => user.id === args.data.author);

    if (!userExists) {
      throw new Error('Invalid User.');
    }

    const post = _objectSpread({
      id: (0, _v.default)()
    }, args.data);

    db.posts.push(post);
    return post;
  },

  deletePost(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    const postIndex = db.posts.findIndex(post => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Post Not found!');
    }

    const deletedPosts = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter(comment => comment.post !== args.id);
    return deletedPosts[0];
  },

  updateUser(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    const {
      data
    } = args;
    const user = db.users.find(user => user.id === args.id);

    if (!user) {
      throw new Error('User not found!');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === args.email);

      if (emailTaken) {
        throw new Error('Email already taken!');
      }

      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    return user;
  },

  createComment(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    const userExists = db.users.some(user => user.id === args.data.author);

    if (!userExists) {
      throw new Error('Invalid User.');
    }

    const postExists = db.posts.some(post => post.id === args.data.post && post.published);

    if (!postExists) {
      throw new Error('Invalid Post.');
    }

    const comment = _objectSpread({
      id: (0, _v.default)()
    }, args.data);

    db.comments.push(comment);
    return comment;
  },

  updatePost(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    const {
      data
    } = args;
    const post = db.posts.find(post => post.id === args.id);

    if (!post) {
      throw new Error('Post not found!');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.published !== 'undefined') {
      post.published = data.published;
    }

    return post;
  },

  deleteComment(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

    if (commentIndex === -1) {
      throw new Error('Comment Not found!');
    }

    const deletedPosts = db.comments.splice(commentIndex, 1);
    return deletedPosts[0];
  },

  updateComment(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    const {
      data
    } = args;
    const comment = db.comments.find(comment => comment.id === args.id);

    if (!comment) {
      throw new Error('comment not found!');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }

    return comment;
  }

};
var _default = Mutation;
exports.default = _default;