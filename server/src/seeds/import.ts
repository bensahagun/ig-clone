import * as users from './user.json';
import * as posts from './posts.json';
import * as hashtags from './hashtags.json';
import * as emojis from './emojis.json';
import { uri } from '../config/mongoose';
import { User, Post, Comment, Hashtag } from '../models';
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
}

init();

// //Users
// users.map((user) => {
//   const document = new User({
//     ...user,
//   });
// });
