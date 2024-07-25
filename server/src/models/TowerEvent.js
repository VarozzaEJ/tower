import { Schema } from "mongoose";



export const TowerEventSchema = new Schema({
    creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
    name: { type: String, minlength: 3, maxlength: 50, required: true, default: 'Ping Pong' },
    description: { type: String, minlength: 15, maxlength: 1000, required: true, default: 'Awesome ping pong tournament at codeworks coming soon' },
    coverImg: { type: String, maxlength: 1000, required: true, default: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGluZyUyMHBvbmd8ZW58MHx8MHx8fDA%3D' },
    location: { type: String, minlength: 1, maxlength: 500, required: true, default: 'Codeworks' },
    capacity: { type: Number, min: 1, max: 5000, required: true, default: 50 },
    startDate: { type: Date, required: true },
    // startTime: { type: String, required: true, default: '00:00' },
    isCanceled: { type: Boolean, default: false, },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital', 'misc'], required: true, default: 'misc', lowercase: true }
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    ref: 'Ticket',
    foreignField: 'eventId',
    count: true
})

//FIXME make ticketCount virtual and find out what it refs to