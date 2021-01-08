const User = {
  posts(parent, args, ctx, info) {
    const { db } = ctx;

    return db.posts.filter((post) => post.author === parent.id);
  },
  comments(parent, args, ctx, info) {
    const { db } = ctx;

    return db.comments.filter((comment) => comment.author === parent.id);
  },
};

export default User;
