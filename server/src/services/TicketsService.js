import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class TicketsService {
    async getEventTickets(eventId) {
        const eventGoers = await dbContext.Tickets.find({ eventId }).populate('profile')
        return eventGoers
    }
    async getMyTickets(accountId) {
        const eventGoers = await dbContext.Tickets.find({ accountId }).populate({ path: 'event', populate: { path: 'creator ticketCount' } })
        return eventGoers
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('event profile')

        return ticket
    }
    async deleteAlbumMember(eventGoerId, userId) {
        const eventGoerToDelete = await dbContext.Tickets.findById(eventGoerId)
        if (userId != eventGoerToDelete.accountId) throw new Forbidden("You cannot delete a ticket that you didn't create")
        await eventGoerToDelete.deleteOne()
        return `You are no longer planning to attend this event`
    }

}

export const ticketsService = new TicketsService()