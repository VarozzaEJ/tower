import { isCancel } from "axios"
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TowerEventsService {

    async createTowerEvent(eventData) {
        const event = await dbContext.TowerEvents.create(eventData)
        await event.populate('creator')
        await event.populate('ticketCount')
        return event
    }
    async getAllEvents() {
        const events = await dbContext.TowerEvents.find().populate('creator').populate('ticketCount')
        return events
    }
    async getEventById(eventId) {
        const event = await dbContext.TowerEvents.findById(eventId).populate('creator').populate('ticketCount')
        if (event === null) throw new Error(`Cannot find an event with the id of ${eventId}`)
        return event
    }
    async editTowerEvent(userId, eventId, eventData) {
        const eventToEdit = await dbContext.TowerEvents.findById(eventId)
        if (eventToEdit.isCanceled == true) throw new BadRequest("Event is cancelled")
        if (eventToEdit.creatorId != userId) throw new Forbidden("You Can't edit a post you didn't make")
        eventToEdit.description = eventData.description || eventToEdit.description
        eventToEdit.name = eventData.name || eventToEdit.name
        eventToEdit.isCanceled = false
        // await eventToEdit.populate('creator')
        await eventToEdit.save()
        return eventToEdit
    }
    async cancelTowerEvent(eventId, userId, eventData) {
        const eventToEdit = await this.getEventById(eventId)
        if (userId != eventToEdit.creatorId) throw new Forbidden('You cannot cancel an event you did not make');
        eventToEdit.isCanceled = !eventToEdit.isCanceled
        await eventToEdit.save()
        return eventToEdit
    }
}

export const towerEventsService = new TowerEventsService()