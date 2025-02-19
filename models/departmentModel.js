const mongoose = require('mongoose');
require('./userModel');

const departmentSchema = mongoose.Schema({
  name: String,
  officerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Department', departmentSchema, 'departments');
