<template>
  <v-row class="justify-center mt-5">
    <v-col cols="6">
      <v-card>
        <v-card-title>
          User Information
        </v-card-title>
        <v-card-text>
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {reactive} from "vue";
import {useAuthStore} from "../store/index.js";

const store = useAuthStore();

const user = reactive({
  name : store?.user?.name,
  email: store?.user?.email
});
</script>