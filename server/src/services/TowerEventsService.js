import { isCancel } from "axios"
import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class TowerEventsService {

    async createTowerEvent(eventData) {
        const event = await dbContext.TowerEvents.create(eventData)
        await event.populate('creator')
        return event
    }
    async getAllEvents() {
        const events = await dbContext.TowerEvents.find().populate('creator')
        return events
    }
    async getEventById(eventId) {
        const event = await dbContext.TowerEvents.findById(eventId).populate('creator')
        if (event === null) throw new Error(`Cannot find an event with the id of ${eventId}`)
        return event
    }
    async editTowerEvent(userId, eventId, eventData) {
        const eventToEdit = await dbContext.TowerEvents.findById(eventId)
        eventData.isCanceled = false
        const editedEvent = await eventToEdit.updateOne(eventData).populate('creator')
        return editedEvent
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