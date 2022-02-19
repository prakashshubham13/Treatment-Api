// Importing packages
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roll: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    admin: {
        type: Boolean,
        required: false
    }
});

export default mongoose.model('User', userSchema);
