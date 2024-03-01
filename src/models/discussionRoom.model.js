const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const discussionRoomSchema = mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Admin',
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        }],
       
    },
    {
        timestamps: true,
    }
);

discussionRoomSchema.plugin(toJSON);

/**
 * @typedef DiscussionRoom
 */
const DiscussionRoom = mongoose.model('Discussion Room', discussionRoomSchema);

module.exports = DiscussionRoom;