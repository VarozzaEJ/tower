import { dbContext } from "../db/DbContext.js"


class TicketsService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('event profile')

        return ticket
    }

}

export const ticketsService = new TicketsService()