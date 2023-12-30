const Joi = require("joi");
const { Assignments } = require("../models");
const httpStatus = require("http-status");

const createAssignments = {
    validation: {
        body: Joi.object().keys({
            title: Joi.string().required(),
            status: Joi.string(),
            assignmentSummary: Joi.string().required(),
            startDate: Joi.string().required(),
            endDate: Joi.string().required(),
            projectDescription: Joi.string(),
        })
    },
    handler: async (req, res) => {
        console.log('req.user', req.user);
    const userData = await Assignments.findOne({title:req.body.title})

        if (userData) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'assignments already exists',
            });
        }
        const body = {
            ...req.body,
            userId: req.user._id
        }
        const assignments = await new Assignments(body).save();
        return res.status(httpStatus.CREATED).send(assignments);
    }
}

const updateAssignments = {
    validation: {
        body: Joi.object().keys({
            title: Joi.string().required(),
            status: Joi.string(),
            assignmentSummary: Joi.string().required(),
            startDate: Joi.string().required(),
            endDate: Joi.string().required(),
            projectDescription: Joi.string(),
        }),
    },
    handler: async (req, res) => {
        await Assignments.findByIdAndUpdate({ _id: req.params.id },{userId}, req.body, { new: true });
        return res.send({ message: "assignments update successfully" });
    }
};

const deleteAssignments = {
    handler: async (req, res) => {
        await Assignments.findByIdAndDelete({ _id: req.params.id });
        return res.status(httpStatus.OK).send({
            message: "assignments delete successfully"
        });
    }
};

const getAssignments={
    handler: async (req, res) => {
        const assignments = await Assignments.find();
        return res.status(httpStatus.OK).send(assignments);
    }

}

module.exports = {
    createAssignments,
    updateAssignments,
    deleteAssignments,
    getAssignments
}