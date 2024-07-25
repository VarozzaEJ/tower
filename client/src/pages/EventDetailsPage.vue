<script setup>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import { capitalize, computed, onMounted } from 'vue';
import EditEventForm from '../components/EditEventForm.vue';

const route = useRoute()
const towerEvent = computed(() =>
    AppState.activeTowerEvent
)
const eventGoerProfiles = computed(() => AppState.eventGoerProfiles)
const identity = computed(() => AppState.identity)
const isFilled = computed(() => AppState.activeTowerEvent.isFilled)

onMounted(() => {
    getEventById()
    getEventGoerProfiles()

})

async function getEventById() {
    try {
        await towerEventsService.getEventById(route.params.eventId)
    }
    catch (error) {
        Pop.error('Couldnt get the specified event');
        logger.log(error)
    }
}

async function cancelEvent() {
    try {
        await towerEventsService.cancelEvent(route.params.eventId)
        getEventById()
    }
    catch (error) {
        logger.log(error)
        Pop.error(error);
    }
}

async function attendEvent() {
    try {
        const eventGoerData = { eventId: route.params.eventId }
        await towerEventsService.attendEvent(eventGoerData)
    }
    catch (error) {
        Pop.error('There was a problem in attempting to attend the event');
    }
}

async function getEventGoerProfiles() {
    try {
        await towerEventsService.getEventGoerProfiles(route.params.eventId)
    }
    catch (error) {
        Pop.error('Could not get attendees for this album');
        logger.error(error)
    }
}



</script>
<!-- v-if="towerEvent.creator.id = AppState.account.id" -->
<!-- FIXME v-if does not work because they must be the same or somethin -->
<template>
    <div v-if="towerEvent" class="container-fluid d-flex flex-column justify-content-center">
        <div class="row d-flex justify-content-end mt-2">
            <div class="col-md-2 d-flex justify-content-end">
                <button @click="cancelEvent" class=" btn btn-danger text-end">Cancel
                    Event</button>
            </div>
        </div>
        <div class="row  justify-content-center d-flex mt-5 rounded">

            <div class="col-12 bg-body-secondary w-75 justify-content-center d-flex">
                <img class=" img-fluid rounded" :src="towerEvent.coverImg" alt="">
            </div>
        </div>
        <div class="row d-flex mt-4 justify-content-around">
            <div class="col-md-6 ">
                <div class="d-flex  align-items-center">
                    <p v-if="towerEvent.isCanceled" class="me-3 mb-0 fs-2 text-danger fw-bold">{{ towerEvent.name }}
                    </p>
                    <p v-else class="me-3 mb-0 fs-2 fw-bold">{{ towerEvent.name }}</p>
                    <div class="">
                        <div role="" class="d-flex bg-primary rounded-pill text-light px-3 py-1 ms-2">
                            {{ towerEvent.type }}</div>

                    </div>
                    <div v-if="isFilled" class="d-flex bg-success rounded-pill text-light px-3 py-1 ms-2">
                        Sold Out</div>
                </div>
                <div class="col-12 d-flex justify-content-center">
                    <p class="fs-6">{{ towerEvent.description }}</p>
                </div>
                <div class="col-6 d-flex flex-column">
                    <span class="fw-bold fs-4">Date And Time</span>
                    <span class="fs-6"><i class="text-info fs-4 mdi mdi-calendar"></i>Starts {{
                        towerEvent.startDate.toLocaleDateString() }} at {{ towerEvent.startDate.toLocaleTimeString() }}
                    </span>
                </div>
                <div class="col-6 d-flex flex-column">
                    <span class="fw-bold fs-4">Location</span>
                    <span class="fs-6"><i class="text-info fs-4 mdi mdi-pin"></i>{{ towerEvent.location }}
                    </span>
                </div>
                <div class="col-12 d-flex mt-5 flex-column">
                    <span class="fw-bold fs-4 mb-3">See What Folks Are Saying</span>
                    <div class="col-12">
                        <div class="card bg-body-secondary " style="">
                            <div class="card-body d-flex justify-content-center flex-column">
                                <form>
                                    <div class="mb-3">
                                        <label for="comment" class="form-label"></label>
                                        <textarea placeholder="Tell the people..." class="form-control" id="comment"
                                            rows="3"></textarea>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-success text-end">Submit</button>
                                    </div>
                                </form>
                                <div class="col-12 mt-3">
                                    <!-- TODO make component and v-for the comments on the line above -->
                                    <div class="row border border-dark mb-3">
                                        <div class="col-2 d-flex align-items-center">
                                            <img class="creator-img" :src="towerEvent.creator.picture" alt="">
                                        </div>
                                        <div class="col-md-10 d-flex flex-column">
                                            <div class="d-flex flex-column">
                                                <span class=" fw-bold fs-5">Varozza, Evan</span>
                                                <span class="fs-6">Lorem ipsum dolor sit amet consectetur adipisicing
                                                    elit. Eos facere, porro laudantium voluptates totam aperiam odit
                                                    distinctio recusandae ratione optio.</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-end">
                                <span class="me-2">2 Spots Left</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="row">

                    <div class="col-12">
                        <div class="card bg-body-secondary " style="">
                            <div class="card-body d-flex justify-content-center flex-column">
                                <h5 class="card-title text-center">Interested in Going?</h5>
                                <p class="card-text text-center">Grab A Ticket
                                </p>
                                <button v-if="towerEvent.isAttending == false" @click="attendEvent()"
                                    class="btn btn-info text-center">Attend</button>
                                <button v-else disabled class="btn btn-success text-center">Attending</button>
                            </div>
                            <div class="text-end">
                                <span class="me-2">{{ eventGoerProfiles.length }} attending</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <span>Attendees</span>
                        <div class="card bg-body-secondary " style="">
                            <div class="card-body d-flex justify-content-center flex-column">
                                <div v-for="eventGoer in eventGoerProfiles" :key="eventGoer.id" class="row mb-3">
                                    <div class="col-12  w-100 d-flex justify-content-center align-items-center">
                                        <div class="border-start border-primary ">

                                            <img class="creator-img ms-2" :src="eventGoer.profile.picture" alt="">
                                            <span class="ms-3">{{ eventGoer.profile.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-end">
                                <span class="me-2">see +8 more</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <ModalWrapper id="edit-event-modal">
        <EditEventForm />
    </ModalWrapper> -->
</template>


<style lang="scss" scoped>
.creator-img {
    aspect-ratio: 1/1;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}
</style>