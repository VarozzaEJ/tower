import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TowerEventsService {
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


}

export const towerEventsService = new TowerEventsService()