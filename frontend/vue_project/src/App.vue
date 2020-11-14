<template>
  <div class="container-fluid">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue';
  export default {
      components: {
          appHeader: Header
      }
  }
</script>

<style scoped>
  .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }
</style>
