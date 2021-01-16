const Query = {
  async users(parent, args, ctx, info) {
    const { db } = ctx;

    try {
      if (!args.query) {
        return await db.user.findMany();
      }

      const response = await db.user.findMany({ where: { name: args.query } });

      return response;
    } catch (error) {}
  },
  async posts(parent, args, ctx, info) {
    const { db } = ctx;

    if (!args.query) {
      return await db.post.findMany();
    }

    const response = await db.post.findMany({
      where:
        AND[
          ({ content: { contains: args.query.toLowerCase() } },
          { title: { contains: args.query.toLowerCase() } })
        ],
    });

    return response;
  },
  async comments(parent, args, ctx, info) {
    const { db } = ctx;

    return await db.comment.findMany();
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
};

export default Query;
