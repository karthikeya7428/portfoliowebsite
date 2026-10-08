const { Schema, model } = require('mongoose');

module.exports = model('Certification', new Schema({
  title:       { type: String, required: true, trim: true },
  issuer:      { type: String, required: true, trim: true },
  type:        { type: String, default: 'Certificate' },   // Certificate, Badge, Hackathon
  description: String,
  skills:      [String],
  link:        String,
  order:       { type: Number, default: 0 }
}, { timestamps: true }));
