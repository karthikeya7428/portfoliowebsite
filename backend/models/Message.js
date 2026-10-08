const { Schema, model } = require('mongoose');

module.exports = model('Message', new Schema({
  name:    { type: String, required: true, trim: true, maxlength: 80 },
  email:   { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true, maxlength: 2000 }
}, { timestamps: true }));
