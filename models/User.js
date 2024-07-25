const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Schema to create a User model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }
  ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// A virtual is not stored in the db, but it is calculated dynamically
// so the number of friends isn't stored in the database in a column, but it can be calculated on the fly 

const User = model('User', userSchema);

module.exports = User;