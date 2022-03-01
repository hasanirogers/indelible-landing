const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const emailValidator = require('email-validator');

const PageSchema = mongoose.Schema({
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
    required: false,
    trim: true,
    lowercase: true,
    index: { unique: false },
    validate: {
      validator: emailValidator.validate,
      message: props => `${props.value} is not a valid email address`
    }
  },
  mediaType: {
    type: String,
    required: true,
    trim: true
  },
  mediaURL: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    index: { unique: true },
  },
  message: {
    type: String,
  }
}, {
  timestamps: true,
});

PageSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Pages', PageSchema);
