<template>
  <v-card width="600" class="mx-auto mt-10">
    <v-card-title>
      <h3 class="display-1">Registration</h3>
    </v-card-title>
    <v-form @submit.prevent="registerHandler">
      <v-card-text>
        <v-text-field
            v-model="data.name"
            label="Name"/>
        <v-text-field
            v-model="data.email"
            label="Email"/>
        <v-text-field
            v-model="data.password"
            type="password"
            label="Password"/>
        <v-text-field
            v-model="data.password_confirmation"
            type="password"
            label="Password Confirmation"/>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" to="/login">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit">Register</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>

</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/store";

const store  = useAuthStore();
const router = useRouter();
const data   = reactive({
  name                 : "",
  email                : "",
  password             : "",
  password_confirmation: ""
});

const registerHandler = () => {
  store.register(data).then(res => {
    if (res.data.success) {
      store.showSnackbar(res.data.message);
      router.push({name: 'login'});
    }
  }).catch(err => {
    if (err.response?.data?.hasOwnProperty('errors')) {
      for (let error in err.response.data.errors) {
        store.showSnackbar(err.response.data.errors[error][0], 'red', 'white');
      }
    } else {
      store.showSnackbar(err?.response?.data?.message, 'red', 'white');
    }
  });
};
</script>