import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";


export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
            .put('/:eventId', this.editTowerEvent)
            .delete('/:eventId', this.cancelTowerEvent)
    }

    async createTowerEvent(request, response, next) {
        try {
            const user = request.userInfo
            const eventData = request.body
            eventData.creatorId = user.id
            const newEvent = await towerEventsService.createTowerEvent(eventData)
            response.send(newEvent)
        } catch (error) {
            next(error)
        }
    }

    async getAllEvents(request, response, next) {
        try {
            const events = await towerEventsService.getAllEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await towerEventsService.getEventById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comment = await commentsService.getEventComments(eventId)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async editTowerEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const user = request.userInfo
            const eventData = request.body
            const editedEvent = await towerEventsService.editTowerEvent(user.id, eventId, eventData)
            response.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelTowerEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const user = request.userInfo
            const eventData = request.body
            const editedEvent = await towerEventsService.cancelTowerEvent(eventId, user.id, eventData)
            response.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(request, response, next) {
        try {
            const eventId = request.params.eventId
            const eventGoers = await ticketsService.getEventTickets(eventId)
            response.send(eventGoers)
        } catch (error) {
            next(error)
        }
    }

}