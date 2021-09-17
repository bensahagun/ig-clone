import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';
import { IPost } from './post';

export interface ILike extends Document<Schema.Types.ObjectId> {
  userId: IUser['_id'];
  postId: IPost['_id'];
  dateCreated: Date;
}

const schema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  dateCreated: { type: Date, default: Date.now },
});

const Like = mongoose.model<ILike>('Like', schema);
export default Like;
