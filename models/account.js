import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default: 0
    },
    clientId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true
    },
    type:{
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    transactions: [{
        from: {
            type: mongoose.Schema.ObjectId,
            ref: 'Account',
            required: true
        },
        to:{
            type: mongoose.Schema.ObjectId,
            ref: 'Account',
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }]
})

export default mongoose.model('Account', accountSchema)