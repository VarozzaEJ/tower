import { Account } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"


export class Ticket {
    constructor(data) {
        this.id = data.id || data._id
        this.accountId = data.accountId
        this.eventId = data.eventId

    }
}

export class EventGoerProfile extends Ticket {
    constructor(data) {
        super(data)
        this.profile = new Account(data.profile)
    }
}

export class EventGoerEvent extends Ticket {
    constructor(data) {
        super(data)
        this.event = new TowerEvent(data.event)
    }
}

// {
//     "accountId": "668ed565e9d5c2965d8c0059",
//         "eventId": "66a17bd9b8c7fe4459535eda",
//             "_id": "66a17bdab8c7fe4459535ede",
//                 "createdAt": "2024-07-24T22:10:34.138Z",
//                     "updatedAt": "2024-07-24T22:10:34.138Z",
//                         "__v": 0,
//                             "profile": {
//         "_id": "668ed565e9d5c2965d8c0059",
//             "subs": [
//                 "google-oauth2|103555482581512495809"
//             ],
//                 "email": "varozzaej@gmail.com",
//                     "name": "Evan Varozza",
//                         "picture": "https://lh3.googleusercontent.com/a/ACg8ocL62By1UZ7porO-C4a98Wf4Ic-SeDlS6lsluEzdP5n1FR0Fs8c=s96-c",
//                             "createdAt": "2024-07-11T21:07:19.986Z",
//                                 "updatedAt": "2024-07-11T21:07:19.986Z",
//                                     "__v": 0,
//                                         "id": "668ed565e9d5c2965d8c0059"
//     },
//     "event": {
//         "_id": "66a17bd9b8c7fe4459535eda",
//             "creatorId": "668ed565e9d5c2965d8c0059",
//                 "name": "Scr1ptK1tt3n",
//                     "description": "Lorem Khaled Ipsum is a major key to success. How’s business? Boomin. The other day the grass was brown, now it’s green because I ain’t give up. Never surrender. To succeed you must believe. When you believe, you will succeed. It’s on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. Lion!",
//                         "coverImg": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
//                             "location": "At The Social Expo Center",
//                                 "capacity": 179,
//                                     "startDate": "2024-07-29T06:00:00.000Z",
//                                         "isCanceled": false,
//                                             "type": "concert",
//                                                 "createdAt": "2024-07-24T22:10:33.948Z",
//                                                     "updatedAt": "2024-07-24T22:10:33.948Z",
//                                                         "__v": 0,
//                                                             "id": "66a17bd9b8c7fe4459535eda"
//     },
//     "id": "66a17bdab8c7fe4459535ede"