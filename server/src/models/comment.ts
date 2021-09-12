import mongoose, { Schema } from 'mongoose';

const schema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  message: String,
  dateCreated: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', schema);

export default Comment;
