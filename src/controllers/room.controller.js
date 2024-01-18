const httpStatus = require("http-status");
const { Admin, Room } = require("../models");
const ApiError = require("../utils/ApiError");
const Joi = require("joi");
const mongoose = require('mongoose');

const createRoom = {
    validation: {
        body: Joi.object().keys({
            receiverId: Joi.string(),

        })
    },
    handler: async (req, res) => {
        console.log('req.user', req.body);
        const userData = await Room.findOne({ receiverId: req.body.receiverId })

        if (userData) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Room already exists',
            });
        }
        const body = {
            ...req.body,
            senderId: req.user._id
        }
        const room = await new Room(body).save();
        return res.status(httpStatus.CREATED).send(room);
    }


};

const getRoom = {
    handler: async (req, res) => {
        const room = await Room.aggregate([
            {
                '$match': {
                    $or: [
                        {
                            senderId:  req.user._id,
                        },
                        {
                            receiverId:  req.user._id,
                        }
                    ]

                }
            }, {
                '$lookup': {
                    'from': 'admins',
                    'localField': 'senderId',
                    'foreignField': '_id',
                    'as': 'sender'
                }
            }, {
                '$unwind': {
                    'path': '$sender',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'admins',
                    'localField': 'receiverId',
                    'foreignField': '_id',
                    'as': 'receiver'
                }
            }, {
                '$unwind': {
                    'path': '$receiver',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'chats',
                    'let': {
                        'id': '$_id'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$$id', '$roomId'
                                    ]
                                }
                            }
                        }, {
                            '$sort': {
                                'created_at': -1
                            }
                        }
                    ],
                    'as': 'receiver_messager'
                }
            }, {
                '$project': {
                    'sender': 1,
                    'receiver': 1,
                    'created_at': 1,
                    'messager': {
                        '$arrayElemAt': [
                            '$receiver_messager', 0
                        ]
                    }
                }
            }
        ]);
        return res.status(httpStatus.OK).send(room);
    }
};


module.exports = {
    createRoom,
    getRoom
}