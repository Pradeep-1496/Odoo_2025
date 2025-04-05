import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{12}$/.test(v);
            },
            message: props => `${props.value} is not a valid Aadhar number!`
        }
    },
    pincode: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{6}$/.test(v);
            },
            message: props => `${props.value} is not a valid pincode!`
        }
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    birthdate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const Profile = mongoose.model('Profile', ProfileSchema);
