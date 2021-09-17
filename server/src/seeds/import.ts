import users from './user.json';
import posts from './posts.json';
import hashtags from './hashtags.json';
import emojis from './emojis.json';
import { uri } from '../config/mongoose';
import { User, Post, Comment, Hashtag, IPost, IUser, IHashtag } from '../models';
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

  const userPromises: Promise<IUser>[] = users.map((user) => {
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

  console.log('Start: Updating posts caption for emojis ...');

  const updatePostPromises = postArr.map((post) => {
    post.caption = post.caption.concat(' ', getEmojis());
    return post.save();
  });

  const postsWithEmojis = await Promise.all(updatePostPromises).then((res) => {
    console.log(`Done: Updating emojis for ${res.length} posts...`);
    return res;
  });

  //Import hashtags

  console.log('Start: Adding hashtags ...');

  const hashtagPromises: Promise<IHashtag>[] = hashtags.map((tag) => {
    return new Hashtag({
      ...tag,
      dateUpdated: null,
    }).save();
  });

  const hashtagArr = await Promise.all(hashtagPromises).then((res) => {
    console.log(`Done: Adding ${res.length} hashtags...`);
    return res;
  });

  console.log('Start: Updating posts `hashtags` and hashtag `posts`...');

  const getHashtags: () => IHashtag[] = () => {
    return hashtagArr.sort(() => Math.random() - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1);
  };

  postsWithEmojis.forEach(async (post: IPost) => {
    const tags = getHashtags();

    post.hashtags = tags;
    await post.save();

    // const updateHashtagPromises = post.hashtags.forEach(async (tag) => {
    //   tag.posts.push(post);
    //   return tag.save();
    // });

    // await Promise.all(updateHashtagPromises).then((res) => {
    //   console.log(`Done: Updating hashtag with ${res.length} posts..`);
    // });
  });

  console.log('Done: Updating posts `hashtags` and hashtag `posts`...');
}

init();
