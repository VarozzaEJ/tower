<script setup>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import { capitalize, computed, onMounted, ref } from 'vue';
import EditEventForm from '../components/EditEventForm.vue';

const route = useRoute()
const towerEvent = computed(() =>
    AppState.activeTowerEvent
)
const eventGoerProfiles = computed(() => AppState.eventGoerProfiles)
const identity = computed(() => AppState.identity)
const isFilled = computed(() => AppState.activeTowerEvent.isFilled)
const isGoing = computed(() => AppState.eventGoerProfiles.find(profileData => profileData.accountId == AppState.account?.id))
const comments = computed(() => AppState.comments)
const isCancelled = computed(() => AppState.activeTowerEvent.isCanceled)
const capacity = computed(() => AppState.activeTowerEvent.capacity)

const commentData = ref({
    body: '',
    eventId: route.params.eventId
})


onMounted(() => {
    getEventById()
    getAllComments()
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
        getEventById()
    }
    catch (error) {
        Pop.error('There was a problem in attempting to attend the event');
    }
}



async function getEventGoerProfiles() {
    try {
        getEventById()
        await towerEventsService.getEventGoerProfiles(route.params.eventId)
        getEventById()
    }
    catch (error) {
        Pop.error('Could not get attendees for this album');
        logger.error(error)
    }
}

async function createComment() {
    try {
        await towerEventsService.createComment(commentData.value)
        Pop.success(`Successfully created comment`)
        resetForm()
        //TODO reset form on submit once comments are finished
    }
    catch (error) {
        Pop.error('Could not create comment', 'error');
    }
}

function resetForm() {
    commentData.value = {
        body: '',
        eventId: route.params.eventId
    }
}

async function getAllComments() {
    try {
        await towerEventsService.getAllComments(route.params.eventId)
    }
    catch (error) {
        Pop.error('Error getting Comments');
        logger.error(error)
    }
}

async function deleteComment(commentId) {
    try {
        const wantsToDelete = await Pop.confirm("Are You Sure?")
        if (!wantsToDelete) return Pop.toast('Comment Was Not Deleted')
        await towerEventsService.deleteComment(commentId)
        getAllComments()
        Pop.toast("Comment was deleted")
    }
    catch (error) {
        Pop.error("Couldn't delete comment");
        logger.error(error)
    }
}


</script>
<!-- v-if="towerEvent.creator.id = AppState.account.id" -->
<!-- FIXME v-if does not work because they must be the same or somethin -->
<template>
    <div v-if="towerEvent" class="container-fluid d-flex flex-column justify-content-center">
        <div class="row d-flex justify-content-end mt-2">
            <!-- <div class="col-5 d-flex justify-content-start">
                <button class="btn btn-success" data-bs-target="#edit-event-modal" data-bs-toggle="modal">Edit
                    Event</button>
            </div> -->
            <div class="col-5 d-flex justify-content-end">
                <button @click="cancelEvent" class=" btn btn-danger text-end">Cancel
                    Event</button>
            </div>
        </div>
        <div class="row  justify-content-center d-flex mt-5 rounded">

            <div class="col-12 bg-body-secondary w-75 justify-content-center d-flex">
                <img class=" img-fluid rounded" :src="towerEvent.coverImg" :alt="`${towerEvent.name}'s picture`">
            </div>
        </div>
        <div class="row d-flex mt-4 justify-content-around">
            <div class="col-md-6 ">
                <div class="d-flex  align-items-center">
                    <p v-if="towerEvent.isCanceled" class="me-3 mb-0 fs-2 text-danger fw-bold">{{ towerEvent.name }}
                    </p>
                    <p v-else class="me-3 mb-0 fs-2 fw-bold">{{ towerEvent.name }}</p>
                    <div class="">
                        <div role="" class="text-capitalize d-flex bg-primary rounded-pill text-light px-3 py-1 ms-2">
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
                    <span class="fs-6 timeStamp"><i class="text-info fs-4 mdi mdi-calendar"></i>Starts {{
                        towerEvent.startDate.toDateString() }} at {{ towerEvent.startDate.toLocaleTimeString() }}
                    </span>
                </div>
                <div class="col-6 d-flex flex-column">
                    <span class="fw-bold fs-4">Location</span>
                    <span class="fs-6"><i class="text-info fs-4 mdi mdi-pin"></i>{{ towerEvent.location }}
                    </span>
                </div>
                <div class="col-12 d-flex mt-5 flex-column">
                    <span class="fw-bold fs-4 mb-3">See What Folks Are Saying</span>
                    <div class="col-12 mb-4">
                        <div class="card bg-body-secondary " style="">
                            <div class="card-body d-flex justify-content-center flex-column">
                                <form @submit.prevent="createComment()">
                                    <div class="mb-3">
                                        <label for="comment" class="form-label"></label>
                                        <textarea v-model="commentData.body" placeholder="Tell the people..."
                                            class="form-control" id="comment" rows="3" name="comment"></textarea>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <button role="button" title="create comment" type="submit"
                                            class="btn btn-success text-end">Submit</button>
                                    </div>
                                </form>
                                <div v-for="comment in comments" :key="comment.id" class="col-12 mt-3">
                                    <!-- TODO make component and v-for the comments on the line above -->
                                    <div class="row border rounded border-dark mx-5 mb-3">
                                        <div
                                            class="col-md-4 justify-content-md-around justify-content-between d-flex align-items-center">
                                            <img class="creator-img" :src="comment.creator.picture" alt="">
                                            <div><button v-if="AppState.account?.id == comment.creator?.id"
                                                    @click="deleteComment(comment.id)" role="button"
                                                    title="Delete Comment" class=" btn btn-danger "><i
                                                        class="mdi mdi-delete-forever"></i></button></div>
                                        </div>
                                        <div class="col-md-8 d-flex flex-column">
                                            <div class="d-flex flex-column">
                                                <span class=" fw-bold fs-5">{{ comment.creator.name }}</span>
                                                <span class="fs-6">{{ comment.body }}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
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
                                <div class="d-flex justify-content-center">
                                    <span class="fw-bold fs-5 text-info text-center" v-if="isGoing">You are already
                                        planning on attending
                                    </span>
                                </div>
                                <button :disabled="!identity || isGoing != undefined || isFilled || isCancelled"
                                    @click="attendEvent()" class="btn btn-success
                                    text-center">Attend</button>
                            </div>
                            <div class="row justify-content-between">
                                <div class="col-5 mx-1 d-flex justify-content-start text-start">

                                    <span class="text-start ms-2">Capacity:
                                    </span>
                                    <span class="fw-bold">{{ capacity -
                                        eventGoerProfiles.length
                                        }}
                                    </span>
                                </div>
                                <div class="col-5 mx-1 d-flex justify-content-end text-end">
                                    <span class="me-2 d-flex fw-bold">{{ eventGoerProfiles.length }}</span>
                                    <span class="d-flex">Attending</span>
                                </div>




                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4 mb-5">
                        <span class="fs-4 fw-bold">Attendees</span>
                        <div class="card bg-body-secondary " style="">
                            <div class="card-body d-flex justify-content-center flex-column">
                                <div v-for="eventGoer in eventGoerProfiles" :key="eventGoer.id" class="row mb-3">
                                    <div class="col-12 w-100 d-flex justify-content-around align-items-center">
                                        <div class="border-start border-primary w-75">
                                            <div class="row d-flex justify-content-between">
                                                <div
                                                    class="col-lg-3 col-5 d-flex align-items-center justify-content-center">
                                                    <img class="creator-img ms-2" :src="eventGoer.profile.picture"
                                                        alt="">
                                                </div>
                                                <div class="col-lg-8 col-7 d-flex align-items-center">
                                                    <span class="ms-3 d-flex align-items-center w-75">{{
                                                        eventGoer.profile.name }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-end">
                                <!-- <span class="me-2">see +8 more</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ModalWrapper id="edit-event-modal">
        <EditEventForm />
    </ModalWrapper>
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

.timeStamp {
    width: 20rem;
    // TODO turn date and Location span tags into columns so they are mobile friendly.
}
</style>