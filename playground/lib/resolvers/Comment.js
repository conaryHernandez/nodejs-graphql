"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Comment = {
  author(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    return db.users.find(user => user.id === parent.author);
  },

  post(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    return db.posts.find(post => post.id === parent.post);
  }

};
var _default = Comment;
exports.default = _default;