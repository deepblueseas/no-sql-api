const mongoose = require('mongoose');
const { Schema } = mongoose;

// these models are based heavily on the models in the miniproject

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
        // this helps the created at to be formatted correctly when "GET" runs
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = ReactionSchema;