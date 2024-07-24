import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";


export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }

    async createTicket(request, response, next) {
        try {
            const user = request.userInfo
            const ticketData = request.body
            ticketData.accountId = user.id
            const newTicket = await ticketsService.createTicket(ticketData)
            response.send(newTicket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(request, response, next) {
        try {
            const eventGoerId = request.params.ticketId
            const userId = request.userInfo.id
            const message = await ticketsService.deleteAlbumMember(eventGoerId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }


}