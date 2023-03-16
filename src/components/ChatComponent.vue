
<script>
/* eslint-disable */
export default {
  name: 'ChatComponent',
  data: function () {
    return {
      connection: null,
      usernameInput: '',
      passwordInput: '',
      roomCodeInput: ''
    }
  },
  methods: {
    connectToChatRoom() {
      console.log('connectToChatRoom');

      this.connection = new WebSocket("ws://127.0.0.1:8000/ws/room/" + this.roomCodeInput + "/")

      this.connection.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData)
      }

      this.connection.onopen = function (event) {
        console.log("Successfully connected to the echo websocket server...")
      }
    },
    logout() {

      fetch('http://127.0.0.1:8000/auth/token/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authToken')
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('ASD')
          localStorage.clear();
          this.$router.push('/login')
        })
    }
  }
}

</script>

<template>
  <h1>Test</h1>
  <button class="btn btn-danger" @click="logout">Logout</button>
  <hr>
  <div class="card col-3">
    <div class="card-header">
      Room
    </div>
    <div class="card-body">
      <h5 class="card-title">Create or connect to a room</h5>
      <div class="mb-3">
        <label for="roomCode" class="form-label">Room code</label>
        <input v-model="roomCodeInput" type="text" class="form-control" id="roomCode" placeholder="Room code">
      </div>

      <button class="btn btn-primary" @click="connectToChatRoom">Connect</button>
      <hr>
      <button class="btn btn-success">Create room</button>
    </div>
  </div>
</template>
