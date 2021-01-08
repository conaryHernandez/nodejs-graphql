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
    const { db } = ctx;

    const userExists = db.users.some((user) => user.id === args.data.author);

    if (!userExists) {
      throw new Error('Invalid User.');
    }

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    db.posts.push(post);

    return post;
  },
  deletePost(parent, args, ctx, info) {
    const { db } = ctx;

    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Post Not found!');
    }

    const deletedPosts = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    return deletedPosts[0];
  },
  createComment(parent, args, ctx, info) {
    const { db } = ctx;

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

    return comment;
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
};

export default Mutation;
