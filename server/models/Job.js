const { Schema, model } = require('mongoose');

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

        },
        dateApplied: {
            type: Date,
            default: Date.now
        },
        techRequired: [
            {
                type: String,
                unique: true,
                required: false,

            }
        ],
        softSkillsRequired: [
            {
                type: String,
                unique: true,
                required: false,
            }
        ],
        jobLink: {
            type: String,
            required: false
        },
        status: {
            type: String,
            default: 'Applied',
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

jobSchema.pre('validate techRequired', function(next) {
    if(this.techRequired.length > 25) throw('Tech required list exceeds 25 items.');
    
    next();
});

jobSchema.pre('validate softSkillsRequired', function(next) {
    if(this.softSkillsRequired.length > 50) throw('Soft skills required list exceeds 50 items.');
    
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