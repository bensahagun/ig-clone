import mongoose, { Schema } from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date,
});

const Hashtag = mongoose.model('Hashtag', schema);

export default Hashtag;
