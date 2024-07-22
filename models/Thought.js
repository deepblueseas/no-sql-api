const { Schema, model } = require('mongoose');
const reactionSchema = require('./reactionSchema');

// Schema to create a User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => createdAt.toISOString().slice(0, 19).replace('T', ' '),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });



const Thought = model('thought', thoughtSchema);

module.exports = Thought;