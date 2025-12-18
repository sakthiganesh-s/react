const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  lastSeen: { type: String, required: true },
  description: { type: String },
  photo: { type: String },
  status: { type: String, default: 'Missing' },
  reporterEmail: { type: String }, 
  dateReported: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', PersonSchema);