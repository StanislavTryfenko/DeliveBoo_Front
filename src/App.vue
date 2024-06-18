<script>
import AppHeader from "./components/partials/AppHeader.vue";
import AppFooter from "./components/partials/AppFooter.vue";

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  }
};
</script>

<template>
  <AppHeader/>
  <main>
    <RouterView/>
  </main>
  <AppFooter/>
</template>

<style>
body {
  background-color: steelblue;
  color: white
}
</style>
