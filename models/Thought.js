const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const reactionSchema = require('./Reactions.js');


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



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;