<template>
  <v-card width="600" class="mx-auto mt-5">
    <v-card-title>
      <h3 class="display-1">Login</h3>
    </v-card-title>
    <v-form @submit.prevent="loginHandler">
      <v-card-text>
        <v-text-field
            label="Email"
            v-model="data.email"
            prepend-icon="mdi mdi-account"/>
        <v-text-field
            type="password"
            label="Password"
            v-model="data.password"
            prepend-icon="mdi mdi-lock"/>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" to="/register">Register</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit">Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router"
import {useAuthStore} from "@/store";

const store        = useAuthStore();
const router       = useRouter();
const data         = reactive({
  email   : "",
  password: ""
});
const loginHandler = () => {
  store.login(data).then(res => {
    if (res.data.success) {
      store.showSnackbar(res.data.message);
      router.push({name: 'dashboard'});
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
