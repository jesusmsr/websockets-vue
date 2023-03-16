<template>
  <div class="container-fluid">
    <router-view :key="$route.path" />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style></style>
