import mongoose, { Schema } from 'mongoose';

const schema = new mongoose.Schema({
  username: { type: String, lowercase: true, trim: true },
  fullName: { type: String, trim: true },
  bio: String,
  emailAddress: { type: String, lowercase: true, trim: true },
  profilePhotoURL: String,
  isNewUser: Boolean,
  followerIds: [Schema.Types.ObjectId],
  followingIds: [Schema.Types.ObjectId],
  postIds: [Schema.Types.ObjectId],
  dateCreated: { type: Date, default: Date.now },
});

const User = mongoose.model('User', schema);

export default User;
