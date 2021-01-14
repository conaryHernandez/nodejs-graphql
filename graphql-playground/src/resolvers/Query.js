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
  posts(parent, args, ctx, info) {
    const { db } = ctx;

    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    });
  },
  comments(parent, args, ctx, info) {
    const { db } = ctx;

    return db.comments || [];
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
