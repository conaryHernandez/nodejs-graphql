import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, ctx, info) {
    const { db } = ctx;

    const emailTaken = db.users.some((user) => user.email === args.data.email);

    if (emailTaken) {
      throw new Error('Email Taken.');
    }

    const user = {
      id: uuidv4(),
      ...args.data,
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, ctx, info) {
    const { db } = ctx;

    const userIndex = db.users.findIndex((user) => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('User Not found!');
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author !== args.id;

      if (match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }

      return !match;
    });

    db.comments = db.comments.filter((comment) => comment.author !== args.id);

    return deletedUsers[0];
  },
  createPost(parent, args, ctx, info) {
    const { db, pubSub } = ctx;

    const userExists = db.users.some((user) => user.id === args.data.author);

    if (!userExists) {
      throw new Error('Invalid User.');
    }

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    db.posts.push(post);

    if (args.data.published) {
      pubSub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    }

    return post;
  },
  deletePost(parent, args, ctx, info) {
    const { db, pubSub } = ctx;

    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Post Not found!');
    }

    const [post] = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    if (post.published) {
      pubSub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: post,
        },
      });
    }

    return post;
  },
  updateUser(parent, args, ctx, info) {
    const { db } = ctx;
    const { data } = args;

    const user = db.users.find((user) => user.id === args.id);

    if (!user) {
      throw new Error('User not found!');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === args.email);

      if (emailTaken) {
        throw new Error('Email already taken!');
      }

      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    return user;
  },
  createComment(parent, args, ctx, info) {
    const { db, pubSub } = ctx;

    const userExists = db.users.some((user) => user.id === args.data.author);

    if (!userExists) {
      throw new Error('Invalid User.');
    }

    const postExists = db.posts.some(
      (post) => post.id === args.data.post && post.published
    );

    if (!postExists) {
      throw new Error('Invalid Post.');
    }

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(comment);

    pubSub.publish(`comment ${args.data.post}`, { comment });

    return comment;
  },
  updatePost(parent, args, ctx, info) {
    const { db, pubSub } = ctx;
    const { data } = args;

    const post = db.posts.find((post) => post.id === args.id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error('Post not found!');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        // deleted
        pubSub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost,
          },
        });
      } else if (!originalPost.published && post.published) {
        // created
        pubSub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post,
          },
        });
      }
    } else if (post.published) {
      // updated
      pubSub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post,
        },
      });
    }

    return post;
  },
  deleteComment(parent, args, ctx, info) {
    const { db } = ctx;

    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error('Comment Not found!');
    }

    const deletedPosts = db.comments.splice(commentIndex, 1);

    return deletedPosts[0];
  },
  updateComment(parent, args, ctx, info) {
    const { db } = ctx;
    const { data } = args;

    const comment = db.comments.find((comment) => comment.id === args.id);

    if (!comment) {
      throw new Error('comment not found!');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }

    return comment;
  },
};

export default Mutation;
