// Importing packages
import mongoose from 'mongoose';

const treatmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    version: {
        type: Number,
        required: true,
        default: 0.001
    },
    status: {
        type: String,
        default: 'user',
        enum: ['DRAFT', 'PUBLISHED'],
    },
    review: {
        type: mongoose.Schema.Types.Date,
    },
    priority:{
         type:Number,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date,
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    deletedAt: {
        type: mongoose.Schema.Types.Date,
    }
},
{versionKey:false}
)
treatmentSchema.index({code:1,version:1},{unique:true});

export default mongoose.model('Treatment', treatmentSchema);