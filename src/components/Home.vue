<template>
  <h1>
    Enkaizen Media Library
  </h1>
</template>

<script setup>
import {inject} from "vue";

console.log('setup.....');

const echo = inject('echo');

echo.channel('testChannel')
    .listen('TestEvent', (e) => {
      console.log(e);
    });
</script>
