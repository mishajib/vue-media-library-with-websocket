<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-btn to="/" class="float-start">
          Enkaizen Media Library
        </v-btn>
      </v-app-bar-title>
      <v-btn-group class="float-end">
        <template v-if="!store.isAuthenticated">
          <v-btn to="/register">Register</v-btn>
          <v-btn to="/login">Login</v-btn>
        </template>
        <template v-else>
          <v-btn :to="{ name: 'images' }">Images</v-btn>
          <v-btn :to="{ name: 'dashboard' }">Dashboard</v-btn>
          <v-btn @click.prevent="logoutHandler">Logout</v-btn>
        </template>
      </v-btn-group>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>

  <v-snackbar
      v-model="store.snackbar.snackbar"
      :timeout="store.snackbar.timeout"
      :color="store.snackbar.color"
  >
    {{ store.snackbar.text }}

    <v-btn
        :color="store.snackbar.closeColor"
        text
        class="float-end"
        @click="store.snackbar.snackbar = false"
        icon="mdi mdi-close"
    >
    </v-btn>
  </v-snackbar>
</template>

<script setup>
import {useAuthStore} from "@/store";
import {useRouter} from "vue-router";

const router = useRouter();

const store = useAuthStore();

const logoutHandler = () => {
  store.logout()
      .then(res => {
        store.showSnackbar(res.data.message);
        router.push('/login');
      })
      .catch(err => {
        store.showSnackbar(err.response.data.message, 'red', 'white');
      });
};
</script>
