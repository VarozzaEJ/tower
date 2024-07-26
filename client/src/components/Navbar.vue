<script setup>
import { onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}

</script>

<template>
  <header>

    <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
          <img alt="logo"
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjFsYjRmOW15cTltc3R0NWR5MHR1bmJzaXVrZW83ZmU3OGtiOWI0MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eXuJCk4LzkFapXld4y/giphy.webp"
            height="45" />
        </div>
        <p class="fs-1 text-center d-flex align-items-center ms-2 mb-0 text-purple poppins-regular">Tower</p>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto">
          <li>

          </li>
        </ul>
        <!-- LOGIN COMPONENT HERE -->
        <div>
          <button class="btn text-light" @click="toggleTheme"
            :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
            <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
          </button>
        </div>
        <Login />
      </div>
    </nav>
  </header>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}

img {
  width: 4rem;
  height: 4rem;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}

.text-purple {
  color: rgb(192, 32, 192);
}

.poppins-regular {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
