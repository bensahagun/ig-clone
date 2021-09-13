import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from './post';

export interface IUser extends Document<Schema.Types.ObjectId> {
  username: string;
  fullName: string;
  bio: string;
  emailAddress: string;
  profilePhotoURL: string;
  isNewUser: boolean;
  followers: IUser['_id'][];
  usersFollowed: IUser['_id'][];
  posts: IPost['_id'][];
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
  followers: [Schema.Types.ObjectId],
  usersFollowed: [Schema.Types.ObjectId],
  posts: [Schema.Types.ObjectId],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date,
});

const User = mongoose.model<IUser>('User', schema);

export default User;
