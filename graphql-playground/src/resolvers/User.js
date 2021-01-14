const User = {
  async posts(parent, args, ctx, info) {
    const { db } = ctx;

    // pending
    return await db.post.findMany({ where: { authorId: Number(parent.id) } });
  },
  async comments(parent, args, ctx, info) {
    const { db } = ctx;

    // pending
    return await db.comment.findMany({
      where: { authorId: Number(parent.id) },
    });
  },
};

export default User;
