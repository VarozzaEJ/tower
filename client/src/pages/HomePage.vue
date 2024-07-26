<script setup>
import { computed, onMounted, ref } from 'vue';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { TowerEvent } from '../models/TowerEvent.js';
import TowerEventCard from '../components/TowerEventCard.vue';


const categoryFilter = ref('all')

const towerEvents = computed(() => {
  if (categoryFilter.value == 'all') {
    return AppState.towerEvents
  }
  return AppState.towerEvents.filter(event => event.type == categoryFilter.value)
})

const categories = ['all', 'concert', 'convention', 'sport', 'digital', 'misc']

onMounted(() => {
  getAllEvents()
})




async function getAllEvents() {
  try {
    await towerEventsService.getAllEvents()
  }
  catch (error) {
    Pop.error("Could Not Get The Events");
  }
}

</script>

<template>
  <div class="container-fluid ">
    <div class="row hero-bg fs-1 text-light justify-content-center align-items-center">
      <div class="col-12 text-shadow">
        <p class="w-md-50">
          Event Management for people, by people
        </p>
        <p class="fs-3 w-md-75">
          Whatever your interest, from hiking and reading, to networking and skill sharing, there are thousands who
          share it on Tower. Events are happening every day-log in to join the fun.
        </p>
      </div>

    </div>
    <div class="row d-flex justify-content-center ">
      <div class="col-11 ms-5 mt-5">
        <p class="fs-2 fw-bold w-75">
          How Tower Works
        </p>
      </div>
      <div class="col-md-6 mb-3 mbmd-0 mb rounded d-flex justify-content-center">
        <div class="card bg-body-secondary" style="width: 18rem; height: 13rem">
          <div class="card-body ">
            <h5 class="card-title">Discover Events You're Interested In</h5>
            <p class="card-text">Browse through community hosted events for all of the things you love.</p>

          </div>
        </div>
      </div>
      <div class="col-md-6 rounded d-flex justify-content-center">
        <div class="card bg-body-secondary" style="width: 18rem; height: 13rem;">
          <div class="card-body">
            <h5 class="card-title">Start an event to invite your friends</h5>
            <p class="card-text">Create your own Tower event, and draw from a community of millions</p>
            <button class="btn btn-success" data-bs-target="#create-event-modal" data-bs-toggle="modal">Create an Event
              <i class="mdi mdi-plus"></i></button>
          </div>
        </div>

      </div>
    </div>
    <div class="row d-flex justify-content-center mt-5">
      <div class="col-11 ms-5">
        <p class="fs-2 fw-bold w-75 pe-0">
          Explore Top Categories
        </p>
      </div>
      <div class="col-md-2 d-flex justify-content-center mb-3 mbmd-0">
        <div role="button" @click="categoryFilter = 'all'" class="card bg-body-secondary "
          style="width: 9rem; height: 6rem;">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title fs-2"><i class="mdi mdi-infinity text-success"></i></h5>
            <h5 class="card-title fw-bold">All</h5>
          </div>
        </div>
      </div>
      <div class="col-md-2 d-flex justify-content-center mb-3 mbmd-0">
        <div role="button" @click="categoryFilter = 'concert'" class="card bg-body-secondary "
          style="width: 9rem; height: 6rem;">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title fs-2"><i class="mdi mdi-guitar-electric text-purple"></i></h5>
            <h5 class="card-title fw-bold">Concerts</h5>
          </div>
        </div>
      </div>
      <div class="col-md-2 d-flex justify-content-center mb-3 mbmd-0">
        <div role="button" @click="categoryFilter = 'convention'" class="card bg-body-secondary "
          style="width: 9rem; height: 6rem;">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title fs-2"><i class="mdi mdi-account-multiple text-primary"></i></h5>
            <h5 class="card-title fw-bold">Conventions</h5>
          </div>
        </div>
      </div>
      <div class="col-md-2 d-flex justify-content-center mb-3 mbmd-0">
        <div role="button" @click="categoryFilter = 'sport'" class="card bg-body-secondary "
          style="width: 9rem; height: 6rem;">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title fs-2"><i class="mdi mdi-soccer text-info"></i></h5>
            <h5 class="card-title fw-bold">Sports</h5>
          </div>
        </div>
      </div>
      <div class="col-md-2 d-flex justify-content-center mb-3 mbmd-0">
        <div role="button" @click="categoryFilter = 'digital'" class="card bg-body-secondary "
          style="width: 9rem; height: 6rem;">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title fs-2"><i class="mdi mdi-laptop text-danger"></i></h5>
            <h5 class="card-title fw-bold">Digital</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-5">
      <div class="col-11 ms-5">
        <p class="fs-2 w-75 fw-bold">
          Upcoming Events
        </p>
      </div>
      <div class="row d-flex justify-content-center">
        <div v-for="event in towerEvents" :key="event.id" class="col-md-4 d-flex justify-content-center">
          <TowerEventCard :eventProp='event' />
        </div>
      </div>
    </div>
  </div>

  <ModalWrapper id="create-event-modal">
    <CreateEventForm />
  </ModalWrapper>
</template>

<style scoped lang="scss">
.hero-bg {
  background-image: url('https://images.unsplash.com/photo-1631888721503-8f343b0cc045?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  height: 40vh
}

.text-shadow {
  text-shadow: 2px 2px black;
}

.text-purple {
  color: purple;
}
</style>
