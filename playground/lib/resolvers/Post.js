"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Post = {
  author(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    return db.users.find(user => user.id === parent.author);
  },

  comments(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    return db.comments.filter(comment => comment.post === parent.id);
  }

};
var _default = Post;
exports.default = _default;