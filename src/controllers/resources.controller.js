const httpStatus = require('http-status');
const Joi = require('joi');
const { Resources } = require('../models');
const { saveFile } = require('../utils/helper');
const ApiError = require('../utils/ApiError');

const creacteResources = {
    validation: {
        body: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required()
            // file:Joi.string().required()

        }),
    },

    handler: async (req, res) => {
        const resourcestitle = await Resources.findOne({ title: req.body.title });
        if (resourcestitle) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Title already exits');
        }

        if (req.files && req.files?.file) {
            const { upload_path } = await saveFile(req.files.file);
            req.body.file = upload_path;
        }

        const body = {
            ...req.body,
            createdBy: req.user._id
        }
        const resources = await new Resources(body).save();
        return res.status(httpStatus.CREATED).send(resources);
    }
};

const updateResources = {
    validation: {
        body: Joi.object().keys({
            title: Joi.string(),
            description: Joi.string(),
            file: Joi.string()
        }),
    },
    handler: async (req, res) => {
        if (req.files && req.files?.file) {
            const { upload_path } = await saveFile(req.files.file);
            req.body.file = upload_path;
        }

        const resources = await Resources.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.send(resources);
    }
};

const deleteResources = {
    handler: async (req, res) => {
        await Resources.findByIdAndDelete({ _id: req.params.id });
        return res.status(httpStatus.OK).send({
            message: "Delete Successfully"
        });
    }
};

const getResources = {
    handler: async (req, res) => {
        const resources = await Resources.find();
        return res.status(httpStatus.OK).send(resources);
    }
}


module.exports = {
    creacteResources,
    updateResources,
    deleteResources,
    getResources
};