const Subscription = {
  count: {
    subscribe(parent, args, ctx, info) {
      const { pubSub } = ctx;

      let count = 0;

      setInterval(() => {
        count++;

        pubSub.publish('count', { count });
      }, 1000);

      return pubSub.asyncIterator('count');
    },
  },
  comment: {
    subscribe(parent, args, ctx, info) {
      const { postId } = args;
      const { db, pubSub } = ctx;

      const post = db.posts.find((post) => post.id === postId);

      if (!post) {
        throw new Error('Post Not found!');
      }

      return pubSub.asyncIterator(`comment ${postId}`);
    },
  },
};

export default Subscription;
