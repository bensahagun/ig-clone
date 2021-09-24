import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from './post';
import { IUser } from './user';

export interface IComment extends Document<Schema.Types.ObjectId> {
  userId: IUser;
  postId: IPost;
  message: string;
  dateCreated: Date;
}

const schema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  message: String,
  dateCreated: { type: Date, default: Date.now },
});

const Comment = mongoose.model<IComment>('Comment', schema);

export default Comment;
