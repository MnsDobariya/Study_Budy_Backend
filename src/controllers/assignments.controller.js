const Joi = require("joi");
const { Assignments, DiscussionRoom, Admin } = require("../models");
const httpStatus = require("http-status");
var ObjectID = require('mongodb').ObjectID;
var objectId = new ObjectID();



const createAssignments = {
    validation: {
        body: Joi.object().keys({
            title: Joi.string().required(),
            status: Joi.string().required(),
            members: Joi.array().required(),
            assignmentSummary: Joi.string().required(),
            startDate: Joi.string().required(),
            endDate: Joi.string().required(),
            projectDescription: Joi.string(),
        })
    },
    handler: async (req, res) => {
        const userData = await Assignments.findOne({ title: req.body.title })

        if (userData) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'assignments already exists',
            });
        }
        const body = {
            ...req.body,
            createdBy: req.user._id,
            members: [...req.body.members, req.user._id]
        }
        const assignments = await new Assignments(body).save();

        await new DiscussionRoom({
            createdBy: req.user._id,
            assignmentId: assignments?._id,
            members: [...req.body.members, req.user._id]
        }).save();

        return res.status(httpStatus.CREATED).send(assignments);
    }
}

const updateAssignments = {
    validation: {
        body: Joi.object().keys({
            title: Joi.string().required(),
            status: Joi.string(),
            members: Joi.array().required(),
            assignmentSummary: Joi.string().required(),
            startDate: Joi.string().required(),
            endDate: Joi.string().required(),
            projectDescription: Joi.string(),
        }),
    },
    handler: async (req, res) => {
        const assignment = await Assignments.findOne({ _id: req.params.id })
        if (!assignment) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Assignment Not Found',
            });
        }
        await Assignments.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(httpStatus.OK).send({ message: "assignments update successfully" });
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

const getAssignments = {
    handler: async (req, res) => {
        // const page = parseInt(req.query.page || 1);
        // const limit = parseInt(req.query.limit || 10);
        // const skipValue = limit * page - limit;

        const assignment = await Assignments.find({
            ...(req.query?.title && { title: req.query?.title }),
            // members: {
            //     $in: req?.user?.id
            // }
        }).populate("members")
        // .limit(limit).skip(skipValue);
        return res.status(httpStatus.OK).send(assignment);

    }
    

}
const getUser = {
    handler: async (req, res) => {
        const user = await Admin.find({ year: req.user.year, role: "User" })
        return res.status(httpStatus.OK).send(user);
    }
}

module.exports = {
    createAssignments,
    updateAssignments,
    deleteAssignments,
    getAssignments,
    getUser
}