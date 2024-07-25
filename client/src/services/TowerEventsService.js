import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { EventGoerEvent, EventGoerProfile, Ticket } from "../models/Ticket.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TowerEventsService {
    async getAllComments(eventId) {
        AppState.comments = []
        const response = await api.get(`api/events/${eventId}/comments`)
        const comments = response.data.map(commentData => new Comment(commentData))
        AppState.comments = comments
    }
    async createComment(commentData) {
        const response = await api.post('api/comments', commentData)
        const newComment = new Comment(response.data)
        AppState.comments.push(newComment)
    }

    async cancelEvent(eventId) {
        const response = await api.delete(`api/events/${eventId}`)
        logger.log('cancelled the event', response.data)
    }
    async createEvent(eventData) {
        const response = await api.post('api/events', eventData)
        const newEvent = new TowerEvent(response.data)
        AppState.towerEvents.push(newEvent)
        return newEvent
    }
    async getAllEvents() {
        const response = await api.get('api/events')
        logger.log(response.data)
        const towerEvents = response.data.map(eventPojo => new TowerEvent(eventPojo))
        AppState.towerEvents = towerEvents
    }

    async getEventById(eventId) {
        AppState.activeTowerEvent = null
        const response = await api.get(`api/events/${eventId}`)
        const activeTowerEvent = new TowerEvent(response.data)
        AppState.activeTowerEvent = activeTowerEvent
        if (AppState.activeTowerEvent.capacity <= AppState.activeTowerEvent.ticketCount) AppState.activeTowerEvent.isFilled = true


    }
    async editEvent(eventData, eventId) {
        const response = await api.put(`api/events/${eventId}`, eventData)
        AppState.activeTowerEvent = new TowerEvent(response.data)
    }

    async attendEvent(eventGoerData) {
        const response = await api.post('api/tickets', eventGoerData)
        const newProfile = new EventGoerProfile(response.data)
        AppState.eventGoerProfiles.push(newProfile)
        AppState.activeTowerEvent.ticketCount++
        AppState.activeTowerEvent.isAttending = true
        if (AppState.activeTowerEvent.capacity <= AppState.activeTowerEvent.ticketCount) AppState.activeTowerEvent.isFilled = true
    }

    async getEventGoerProfiles(eventId) {

        const response = await api.get(`api/events/${eventId}/tickets`)
        const eventGoerProfiles = await response.data.map(eventGoerData => new EventGoerProfile(eventGoerData))
        AppState.eventGoerProfiles = eventGoerProfiles
        return AppState.eventGoerProfiles
    }
    async getMyEvents() {
        const response = await api.get('account/tickets')
        logger.log(response.data)
        const myEvents = response.data.map(myEventData => new EventGoerEvent(myEventData))
        AppState.eventGoerEvents = myEvents
    }

    async deleteTicket(eventGoerId) {
        const response = await api.delete(`api/tickets/${eventGoerId}`)
        logger.log(response.data)
    }
}

export const towerEventsService = new TowerEventsService()