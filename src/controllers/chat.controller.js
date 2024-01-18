const Joi = require("joi");
const { Chat } = require("../models");
const Message = require("../models/chat.model");
const httpStatus = require("http-status");

// const createChat = {
//     validation: {
//         body: Joi.object().keys({
//             receiverId:Joi.string(),
//             roomId:Joi.string(),
//             message:Joi.string()
//         })
//     },
//     handler: async (req, res) => {

//         // const message = new Message({
//         //     chatId, senderId, text
//         // });
//         //     const messages = await message.save();
//         //     res.status(200).json(messages)

//         const userData = await Chat.findOne({ roomId: req.body.roomId })

//         if (userData) {
//             return res.status(httpStatus.BAD_REQUEST).send({
//                 message: 'Room already exists',
//             });
//         }
        
//         const body = {
//             ...req.body,
//             senderId: req.user._id
//         }
//         const chat = await new Chat(body).save();
//         return res.status(httpStatus.CREATED).send(chat);
        
//     }
// }

const createChat = {
    validation: {
        body: Joi.object().keys({
            receiverId:Joi.string().required(),
            roomId:Joi.string().required(),
            message:Joi.string()
        })
    },
    handler: async (req, res) => {
        console.log('req.user', req.body);
        const userData = await Chat.findOne({ roomId: req.body.roomId })

        if (userData) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Room already exists',
            });
        }
        const body = {
            ...req.body,
            senderId: req.user._id
        }
        const chat = await new Chat(body).save();
        return res.status(httpStatus.CREATED).send(chat);
    }


};

const getChat = {
    handler: async (req, res) => {

        const chat = await Chat.findOne({roomId: req.body.roomId, _id: { $ne: req.params.id }});
        return res.status(httpStatus.OK).send(chat);
      }
}


module.exports = {
    createChat,
    getChat,
    
}