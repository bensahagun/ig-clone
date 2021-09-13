import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from './post';

export interface IUser extends Document<Schema.Types.ObjectId> {
  username: string;
  fullName: string;
  bio: string;
  emailAddress: string;
  profilePhotoURL: string;
  isNewUser: boolean;
  followerIds: IUser['_id'][];
  followingIds: IUser['_id'][];
  postIds: IPost['_id'][];
  dateCreated: Date;
  dateUpdated: Date;
}

const schema = new mongoose.Schema({
  username: { type: String, lowercase: true, trim: true },
  fullName: { type: String, trim: true },
  bio: String,
  emailAddress: { type: String, lowercase: true, trim: true },
  profilePhotoURL: String,
  isNewUser: { type: Boolean, default: true },
  followerIds: [Schema.Types.ObjectId],
  followingIds: [Schema.Types.ObjectId],
  postIds: [Schema.Types.ObjectId],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date,
});

const User = mongoose.model<IUser>('User', schema);

export default User;
