const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userName: { type: String, required: true},
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        maps: [{ type: ObjectId, ref: 'Map' }],
        posts: [{ type: ObjectId, ref: 'Post' }]
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)