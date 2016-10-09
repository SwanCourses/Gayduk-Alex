/**
 * Created by ankain on 01.10.16.
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: 'String', required: true },
  code: { type: 'String', required: true },
  description: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  size: { type: 'String', required: true },
  colors: { type: 'Object', required: true },
  group: { type: 'String', required: true },
  photos: [],
});

export default mongoose.model('Product', productSchema);
