import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from './post';

export interface IHashtag extends Document<Schema.Types.ObjectId> {
  name: string;
  posts: IPost[];
  dateCreated: Date;
  dateUpdate: Date;
}

const schema = new mongoose.Schema({
  name: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date,
});

const Hashtag = mongoose.model<IHashtag>('Hashtag', schema);

export default Hashtag;
