import { Account } from "./Account.js"


export class TowerEvent {
    constructor(data) {
        this.id = data.id || data._id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate)
        // this.startTime = data.startTime
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.creator = data.creator ? new Account(data.creator) : null
        this.ticketCount = data.ticketCount
        this.isAttending = false
        this.isFilled = false
    }
}

// {
//     "_id": "66a02fdce6870539eb9a84e1",
//         "creatorId": "668ed565e9d5c2965d8c0059",
//             "name": "C3P0",
//                 "description": "It is practically impossible to teach good programming style to students that have had prior exposure to BASIC. As potential programmers, they are mentally mutilated beyond hope of regeneration. If McDonalds were run like a software company, one out of every hundred Big Macs would give you food poisoning, and the response would be, ‘We’re sorry, here’s a coupon for two more.’  If builders built buildings the way programmers wrote programs, then the first woodpecker that came along would destroy civilization. Ready, fire, aim: the fast approach to software development. Ready, aim, aim, aim, aim: the slow approach to software development. Deleted code is debugged code.",
//                     "coverImg": "https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
//                         "location": "At The Social Expo Center",
//                             "capacity": 63,
//                                 "startDate": "2024-07-27T06:00:00.000Z",
//                                     "isCanceled": false,
//                                         "type": "digital",
//                                             "createdAt": "2024-07-23T22:34:04.118Z",
//                                                 "updatedAt": "2024-07-23T22:34:04.118Z",
//                                                     "__v": 0,
//                                                         "creator": {
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
//     "id": "66a02fdce6870539eb9a84e1"
// }