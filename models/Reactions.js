const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ReactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => createdAt.toISOString().slice(0, 19).replace('T', ' '),
        },
    },
    {
        //do i need this?
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = ReactionSchema;