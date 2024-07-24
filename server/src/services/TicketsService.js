import { dbContext } from "../db/DbContext.js"


class TicketsService {
    async getMyTickets(accountId) {
        const eventGoers = await dbContext.Tickets.find({ accountId }).populate({ path: 'event', populate: { path: 'creator ticketCount' } })
        return eventGoers
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('event profile')

        return ticket
    }

}

export const ticketsService = new TicketsService()