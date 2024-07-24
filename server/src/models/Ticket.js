import { Schema } from "mongoose";


export const TicketSchema = new Schema({

    accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.ObjectId, ref: 'TowerEvent', required: true },

}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true, //NOTE justone might not be the move on here because there are mutliple tickets for each event. Not sure tho.
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
})