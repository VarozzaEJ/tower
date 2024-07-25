<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import TowerEventCard from '../components/TowerEventCard.vue';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';

const account = computed(() => AppState.account)
const myEvents = computed(() => AppState.eventGoerEvents)
// const myEvents = computed(()=> AppState.)
onMounted(() => {
  getMyEvents()
})

async function getMyEvents() {
  try {
    await towerEventsService.getMyEvents()
  }
  catch (error) {
    Pop.error('Could Not Get Your Events');
  }
}

async function deleteTicket(eventGoerId) {
  try {

    const wantsToDelete = await Pop.confirm("Are you sure you want to delete your ticket?")
    if (wantsToDelete == false) {
      Pop.toast('Ticket was not deleted')
      return
    }
    await towerEventsService.deleteTicket(eventGoerId)
    Pop.success('Ticket was deleted')
    getMyEvents()
  }
  catch (error) {
    Pop.error('Error trying to delete your ticket');
    logger.log(error)
  }
}


</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <div>
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div class="container-fluid">
        <div class="row d-flex justify-content-center">
          <div v-for="event in myEvents" :key="event.id" class="col-md-4 d-flex flex-column justify-content-center">
            <TowerEventCard :eventProp="event.event" />
            <div class="mb-4">
              <button class="btn btn-danger" @click="deleteTicket(event.id)">Delete Your Ticket</button>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
