import users from './user.json';
import posts from './posts.json';
import hashtags from './hashtags.json';
import emojis from './emojis.json';
import { uri } from '../config/mongoose';
import { User, Post, Comment, Hashtag } from '../models';
import { IUser, IPost } from '../models';
import mongoose from 'mongoose';

async function init() {
  await mongoose.connect(uri);

  console.log('Start: Dropping collections..');
  console.log('Droppping: User..');
  await User.collection.drop();
  console.log('Droppping: Post..');
  await Post.collection.drop();
  console.log('Droppping: Comment..');
  await Comment.collection.drop();
  console.log('Droppping: Hashtag..');
  await Hashtag.collection.drop();
  console.log('Done: Dropping collections..');

  //Users
  console.log('Start: Add users...');

  const userPromises = users.map((user) => {
    new User({
      ...user,
      followerIds: [],
      followingIds: [],
      postIds: [],
      dateUpdated: null,
    }).save();
  });

  const userArr = await Promise.all(userPromises).then((res) => {
    console.log(`Done: Adding ${res.length} users...`);
    return res;
  });

  //Posts
  console.log('Start: Add posts...');

  const postPromises = posts.map((post, index) => {
    new Post({
      ...post,
      photoURL: `https://picsum.photos/seed/${post.seed}/1228/1228`,
      authorId: userArr[Math.ceil((index + 1) / 5)],
      commentIds: [],
      likes: [],
      hashtags: [],
      dateUpdated: null,
    }).save();
  });

  const postArr = await Promise.all(postPromises).then((res) => {
    console.log(`Done: Adding ${res.length} users...`);
    return res;
  });

  console.log('Updating users `postIds` field ...');

  // const updateUsersPromises = postArr.map((post) => {
  //   User.findById(post.authorId)
  //     .exec()
  //     .then((doc) => {
  //       if (!doc) return;

  //       doc.postIds = [...doc.postIds, post._id];
  //       return doc.save();
  //     });
  // });
}

init();
