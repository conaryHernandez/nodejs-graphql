"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Scalar Types  = String, Boolean, Int, Float, ID
// Demo Data
const users = [{
  id: '1',
  name: 'Conary',
  email: 'Conary@example.com',
  age: 25
}, {
  id: '2',
  name: 'Sara',
  email: 'Sara@example.com',
  age: 30
}, {
  id: '3',
  name: 'John',
  email: 'John@example.com',
  age: 20
}];
const posts = [{
  id: '1',
  title: 'First Post',
  body: 'this is a post 1',
  published: 25,
  author: '1'
}, {
  id: '2',
  title: 'second Post',
  body: 'this is a post 2',
  published: 30,
  author: '1'
}, {
  id: '3',
  title: 'third Post',
  body: 'this is a post 3',
  published: 20,
  author: '2'
}];
const comments = [{
  id: 'comment-1',
  text: 'First Comment',
  author: '1',
  post: '1'
}, {
  id: 'comment-2',
  text: 'second Comment',
  author: '1',
  post: '1'
}, {
  id: 'comment-3',
  text: 'third Comment',
  author: '3',
  post: '1'
}, {
  id: 'comment-4',
  text: 'forth Comment',
  author: '3',
  post: '1'
}];
const db = {
  users,
  comments,
  posts
};
var _default = db;
exports.default = _default;