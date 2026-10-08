const { Schema, model } = require('mongoose');

module.exports = model('Project', new Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tech:        [String],
  github:      String,
  live:        String,
  post:        String,   // LinkedIn post about the project
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 }
}, { timestamps: true }));
