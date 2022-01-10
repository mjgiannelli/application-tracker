const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const jobSchema = new Schema(
    {
        companyName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 100
        },
        jobTitle: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50
        },
        industry: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50
        },
        dateApplied: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        techRequired: [
            {
                type: String,
                required: false,
                default: [],
                minlength: 1,
                maxlength: 50
            }
        ],
        softSkillsRequired: [
            {
                type: String,
                required: false,
                minlength: 1,
                maxlength: 50
            }
        ],
        jobLink: {
            type: String,
            required: false,
            minlength: 1,
            maxlength: 250
        },
        status: {
            type: String,
            default: 'Applied',
            required: false,
            minlength: 1,
            maxlength: 50
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

jobSchema.pre('validate techRequired', function (next) {
    if (this.techRequired.length > 25) throw ('Tech required list exceeds 25 items.');

    next();
});

jobSchema.pre('validate softSkillsRequired', function (next) {
    if (this.softSkillsRequired.length > 50) throw ('Soft skills required list exceeds 50 items.');

    next();
});

jobSchema.virtual('techRequiredCount').get(function () {
    return this.techRequired.length;
});

jobSchema.virtual('softSkillsRequiredCount').get(function () {
    return this.softSkillsRequired.length;
});

const Job = model('Job', jobSchema);

module.exports = Job;