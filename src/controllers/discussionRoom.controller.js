const httpStatus = require("http-status");
const { Admin, Room, DiscussionRoom } = require("../models");
const ApiError = require("../utils/ApiError");
const Joi = require("joi");
const mongoose = require('mongoose');

const createDiscussionRoom = {
    validation: {
        body: Joi.object().keys({
            senderId: Joi.string(),
            members:Joi.array().required()
        })
    },
    handler: async (req, res) => {
        console.log('req.user', req.body);
        const userData = await DiscussionRoom.findOne({  $or: [
            {
                senderId:  req.user._id,
            },
            {
                senderId: req.body.receiverId
            }
        ] })

        if (userData) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Room already exists',
            });
        }
        const body = {
            ...req.body,
            senderId: req.user._id
        }
        const discussionRoom = await new DiscussionRoom(body).save();
        return res.status(httpStatus.CREATED).send(discussionRoom);
    }


};

const getDiscussionRoom = {
    handler: async (req, res) => {
        // const room = await Room.aggregate([
        //     {
        //         '$match': {
        //             $or: [
        //                 {
        //                     senderId:  req.user._id,
        //                 },
        //                 {
        //                     receiverId:  req.user._id,
        //                 }
        //             ]

        //         }
        //     }, {
        //         '$lookup': {
        //             'from': 'admins',
        //             'localField': 'senderId',
        //             'foreignField': '_id',
        //             'as': 'sender'
        //         }
        //     }, {
        //         '$unwind': {
        //             'path': '$sender',
        //             'preserveNullAndEmptyArrays': true
        //         }
        //     }, {
        //         '$lookup': {
        //             'from': 'admins',
        //             'localField': 'receiverId',
        //             'foreignField': '_id',
        //             'as': 'receiver'
        //         }
        //     }, {
        //         '$unwind': {
        //             'path': '$receiver',
        //             'preserveNullAndEmptyArrays': true
        //         }
        //     }, {
        //         '$lookup': {
        //             'from': 'chats',
        //             'let': {
        //                 'id': '$_id'
        //             },
        //             'pipeline': [
        //                 {
        //                     '$match': {
        //                         '$expr': {
        //                             '$eq': [
        //                                 '$$id', '$roomId'
        //                             ]
        //                         }
        //                     }
        //                 }, {
        //                     '$sort': {
        //                         'createdAt': -1
        //                     }
        //                 }
        //             ],
        //             'as': 'receiver_messager'
        //         }
        //     }, {
        //         '$project': {
        //             'sender': 1,
        //             'receiver': 1,
        //             'createdAt': 1,
        //             'messager': {
        //                 '$arrayElemAt': [
        //                     '$receiver_messager', 0
        //                 ]
        //             }
        //         }
        //     }
        // ]);
        const discussionRoom=await DiscussionRoom.find();
        return res.status(httpStatus.OK).send(discussionRoom);
    }
};


module.exports = {
    createDiscussionRoom,
    getDiscussionRoom
}