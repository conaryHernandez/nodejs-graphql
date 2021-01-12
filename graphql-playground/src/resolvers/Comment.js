const Comment = {
  author(parent, args, ctx, info) {
    const { db } = ctx;

    return db.users.find((user) => user.id === parent.author);
  },
  post(parent, args, ctx, info) {
    const { db } = ctx;

    return db.posts.find((post) => post.id === parent.post);
  },
};

export default Comment;
