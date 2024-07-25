import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {import('./models/TowerEvent.js').TowerEvent[]} user info from the database*/
  towerEvents: [],

  /** @type {import('./models/TowerEvent.js').TowerEvent} user info from the database*/
  activeTowerEvent: null,

  /** @type {import('./models/Ticket.js').EventGoerProfile[]} user info from the database*/
  eventGoerProfiles: [],

  /** @type {import('./models/Ticket.js').EventGoerEvent[]} user info from the database*/
  eventGoerEvents: [],

  /** @type {import('./models/Comment.js').Comment[]} user info from the database*/
  comments: [],
})