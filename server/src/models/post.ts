import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';
import { IComment } from './comment';
import { IHashtag } from './hashtag';

export interface IPost extends Document<Schema.Types.ObjectId> {
  author: IUser;
  photoURL: string;
  caption: string;
  comments: IComment[];
  likes: IUser[];
  hashtags: IHashtag[];
  dateCreated: Date;
  dateUpdated: Date;
}

const schema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  photoURL: String,
  caption: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  hashtags: [{ type: Schema.Types.ObjectId, ref: 'Hashtag' }],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date,
});

const Post = mongoose.model<IPost>('Post', schema);

export default Post;
