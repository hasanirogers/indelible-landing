const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const emailValidator = require('email-validator');

const CardSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: { unique: true },
    validate: {
      validator: emailValidator.validate,
      message: props => `${props.value} is not a valid email address`
    }
  }
}, {
  timestamps: true,
});

CardSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Cards', CardSchema);
