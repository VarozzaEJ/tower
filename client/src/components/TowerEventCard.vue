<script setup>
import { RouterLink } from 'vue-router';
import { TowerEvent } from '../models/TowerEvent.js';


defineProps({ eventProp: { type: TowerEvent, required: true } })


</script>


<template>
    <RouterLink :to="{ name: 'Event Details', params: { eventId: eventProp.id } }">
        <div class="col-12 mb-2">
            <div class="card" style="width: 20rem;">
                <img :src="eventProp.coverImg" class="card-img-top"
                    :alt="`An image of an event with the type of ${eventProp.type}`">
                <div class="card-body bg-body-secondary">
                    <h5 class="card-title">{{ eventProp.name }}</h5>
                    <p class="text-success">Hosted By <span>{{ eventProp.creator.name }}</span></p>
                    <p>{{ eventProp.startDate.toDateString() }} - {{ eventProp.location }}</p>
                    <!-- <p>{{ eventProp.capacity - eventProp.ticketCount }}</p> -->
                </div>
            </div>
        </div>
    </RouterLink>
</template>


<style lang="scss" scoped></style>