import users from './user.json';
import posts from './posts.json';
import hashtags from './hashtags.json';
import emojis from './emojis.json';
import { uri } from '../config/mongoose';
import { User, Post, Comment, Hashtag, IPost, IUser } from '../models';
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
    return new User({
      ...user,
      followers: [],
      usersFollowed: [],
      posts: [],
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
    return new Post({
      ...post,
      photoURL: `https://picsum.photos/seed/${post.seed}/1228/1228`,
      author: userArr[Math.ceil((index + 1) / 5) - 1],
      comments: [],
      likes: [],
      hashtags: [],
      dateUpdated: null,
    }).save();
  });

  const postArr = await Promise.all(postPromises).then((res) => {
    console.log(`Done: Adding ${res.length} posts...`);
    return res;
  });
  //Update users
  console.log('Start: Updating users `postIds` field ...');

  const groupBy = (objArr: IPost[], key: string) => {
    return objArr.reduce((acc, obj) => {
      let keyName = obj[key].id;

      if (!acc[keyName]) {
        acc[keyName] = [];
      }

      acc[keyName].push(obj);
      return acc;
    }, {});
  };

  const groupedPostArr = groupBy(postArr, 'author');

  let updateUserPromises: Promise<IUser>[] = [];

  for (const index in groupedPostArr) {
    const user = await User.findById(index).exec();

    if (!user) continue;

    user.posts = groupedPostArr[index];
    updateUserPromises.push(user.save());
  }

  await Promise.all(updateUserPromises).then((res) => {
    console.log('Done: Updating users `postIds` field ...');
  });

  //EMOJIS

  const getEmojis = () => {
    return emojis
      .sort(() => Math.random() - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1)
      .join(' ');
  };

  const updatePostPromises = postArr.map((post) => {
    post.caption = post.caption.concat(' ', getEmojis());
    return post.save();
  });

  const updatedPosts = await Promise.all(updatePostPromises).catch((err) => console.log(err));
}

init();
