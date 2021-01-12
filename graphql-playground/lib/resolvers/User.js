"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const User = {
  posts(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    return db.posts.filter(post => post.author === parent.id);
  },

  comments(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    return db.comments.filter(comment => comment.author === parent.id);
  }

};
var _default = User;
exports.default = _default;