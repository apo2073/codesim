<template>
  <div id="app">
    <PasswordAnalyzer />
  </div>
</template>

<script>
import PasswordAnalyzer from './components/password.vue'

export default {
  name: 'App',
  components: {
    PasswordAnalyzer
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
