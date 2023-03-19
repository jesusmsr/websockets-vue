<template>
  <div class="container-fluid">
    <router-view :key="$route.path" />
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    createId() {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < 10) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }
  },
  created() {
    let userId = localStorage.getItem('userId');
    if (!userId) { userId = this.createId() }
    localStorage.setItem('userId', userId);

    let settings = localStorage.getItem('userSettings');
    if (!settings) {
      settings = JSON.stringify({
        username: 'Guest' + Math.floor(1000 + Math.random() * 9000)
      })
    }
    localStorage.setItem('userSettings', settings);
  }
}
</script>

<style></style>
