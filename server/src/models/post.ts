import mongoose, { Schema } from 'mongoose';

const schema = new mongoose.Schema({
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  photoURL: String,
  caption: String,
  commentIds: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  hashtags: [{ type: Schema.Types.ObjectId, ref: 'Hashtag' }],
  dateCreated: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', schema);

export default Post;
