<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { useRoute, useRouter } from 'vue-router';
import { Modal } from 'bootstrap';


const route = useRoute()
const router = useRouter()

const eventData = ref({
    name: '',
    description: '',
    coverImg: '',
    location: '',
    capacity: 0,
    startDate: new Date(), //NOTE this more than likely is wrong
    type: '',
    //NOTE might need to put creator info in here??
})

async function createEvent() {
    try {
        const newEvent = await towerEventsService.createEvent(eventData.value)
        Pop.success(`You created a new event called ${newEvent.name}`)
        resetForm()
        Modal.getOrCreateInstance('#create-event-modal').hide()
        router.push({ name: 'Event Details', params: { eventId: newEvent.id } })
    }
    catch (error) {
        Pop.error('Could Not Create Event');
    }
}

function resetForm() {
    eventData.value = {
        name: '',
        description: '',
        coverImg: '',
        location: '',
        capacity: 0,
        startDate: new Date(), //NOTE this more than likely is wrong
        type: '',
    }
}
</script>


<template>
    <form class="container-fluid" @submit.prevent="createEvent()">
        <p class="fs-2">Create a Tower Event</p>
        <section class="row">
            <div class="mb-2 col-md-6">
                <label for="event-name">Name</label>
                <input v-model="eventData.name" class="form-control" type="text" id="event-name" name="event-name"
                    minlength="3" maxlength="50" required>
            </div>
            <div class="mb-2 col-md-6">
                <label for="event-location">Location</label>
                <input v-model="eventData.location" class="form-control" type="text" id="event-location"
                    name="event-location" minlength="1" maxlength="500" required>
            </div>
            <div class="mb-2 col-md-6">
                <label for="event-capacity">Capacity</label>
                <input v-model="eventData.capacity" class="form-control" type="number" id="event-capacity"
                    name="event-capacity" min="1" max="5000" required>
            </div>
            <div class="mb-2 col-md-6">
                <label for="event-cover-img">Cover Image</label>
                <input v-model="eventData.coverImg" class="form-control" type="url" id="event-cover-img"
                    name="event-cover-img" required>
            </div>
            <div class="mb-2 col-12">
                <label for="event-description">Description</label>
                <textarea v-model="eventData.description" minlength="15" maxlength="1000" class="form-control"
                    name="event-description" id="event-description"></textarea>
            </div>
            <div class="mb-2 col-12">
                <label for="event-type">Type</label>
                <select v-model="eventData.type" required class="form-control" name="event-type" id="event-type">
                    <option value="" disabled>Please Select A Type</option>
                    <option value="concert">Concert</option>
                    <option value="convention">Convention</option>
                    <option value="misc">Miscellaneous</option>
                    <option value="sport">Sports</option>
                    <option value="digital">Digital</option>
                </select>
            </div>
            <div class="col-12 text-end">
                <button type="button" class="btn btn-danger me-1" @click="resetForm()"> clear </button>
                <button class="btn btn-success ms-1">Submit</button>
            </div>
        </section>
    </form>
</template>


<style lang="scss" scoped></style>