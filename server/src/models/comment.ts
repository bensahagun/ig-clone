import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from './post';
import { IUser } from './user';

export interface IComment extends Document<Schema.Types.ObjectId> {
  userId: IUser['_id'];
  postId: IPost;
  message: string;
  dateCreated: Date;
}

const schema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  message: String,
  dateCreated: { type: Date, default: Date.now },
});

const Comment = mongoose.model<IComment>('Comment', schema);

export default Comment;
