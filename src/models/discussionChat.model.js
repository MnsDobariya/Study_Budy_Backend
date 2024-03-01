const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const discussionChatSchema = mongoose.Schema(
    {
        // senderId:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Admin',
        // },
        receiverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Admin',
        },
        message:{
            type:String,    
            required:true,
        },
        discussionroomId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Discussion Room',
            required:true,
        },
    },
    {
        timestamps: true,
    }
);

discussionChatSchema.plugin(toJSON);

/**
 * @typedef discussionChat
 */
const discussionChat = mongoose.model('Discussion Chat', discussionChatSchema);

module.exports = discussionChat;