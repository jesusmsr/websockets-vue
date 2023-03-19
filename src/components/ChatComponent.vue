
<script>
/* eslint-disable */
export default {
  name: 'ChatComponent',
  data: function () {
    return {
      connection: null,
      usernameInput: '',
      passwordInput: '',
      room_code: '',
      chatInput: '',
      chatLog: [],
      username: '',
      status: 'Not started',
    }
  },
  methods: {
    connectToChatRoom() {
      console.log('connectToChatRoom');

      this.connection = new WebSocket("ws://127.0.0.1:8000/ws/room/" + this.room_code + "/");

      this.connection.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData);
        if (parsedData.message === 'round_end') {
          this.status = 'Round end';
        } else if (parsedData.message === 'round_start') {
          this.status = 'Started';
        }
        if (parsedData.type === 'chat_message') {
          this.chatLog.push({
            message: parsedData.message,
            author: parsedData.author
          });
        }
      }

      this.connection.onopen = function (event) {
        console.log("Successfully connected to the echo websocket server...")
      }
    },
    logout() {
      sessionStorage.clear();
      this.$router.push('/login')
    },
    sendChat() {
      console.log('chat')
      this.connection.send(JSON.stringify({
        'message': this.chatInput,
        'author': this.username,
        'type': 'chat_message'
      }));
      this.chatInput = '';
    },
    createRoom() {
      fetch('http://127.0.0.1:8000/chat/rooms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          'room': {
            'max_players': 5,
            'is_active': 'true'
          }
        })
      })
        .then(response => response.json())
        .then(data => {
          this.room_code = data.room_code;
          this.connectToChatRoom();

        })
    },
    startRound() {
      this.status = 'Started';
      this.connection.send(JSON.stringify({
        'type': 'round_start'
      }));
    }
  },
  created() {
    this.username = sessionStorage.getItem('username');
  }
}

</script>

<template>
  <h1>{{ username }}</h1>
  <button class="btn btn-danger" @click="logout">Logout</button>
  <hr>
  <div v-if="!connection" class="card col-3">
    <div class="card-header">
      Room
    </div>
    <div class="card-body">
      <h5 class="card-title">Create or connect to a room</h5>
      <div class="mb-3">
        <label for="roomCode" class="form-label">Room code</label>
        <input v-model="room_code" type="text" class="form-control" id="roomCode" placeholder="Room code">
      </div>

      <button class="btn btn-primary" @click="connectToChatRoom">Connect</button>
      <hr>
      <button class="btn btn-success" @click="createRoom">Create room</button>
    </div>
  </div>
  <div v-if="connection">
    <h3>{{ room_code }}</h3>
  </div>
  <div v-if="connection" class="sections-holder">
    <div class="col-3">
      <div class="card">
        <div class="card-header">
          Chat
        </div>
        <div class="card-body">
          <div class="chat-area">
            <p v-for="chat of chatLog">{{ chat.author + ': ' + chat.message }}</p>
          </div>
          <div>
            <form @submit.prevent="sendChat">
              <input v-model="chatInput" type="text" class="form-control" id="chatInput" placeholder="Say something">
            </form>

          </div>
        </div>
      </div>
    </div>
    <div class="col-7">
      <div class="card">
        <div class="card-header">
          Game
        </div>
        <div class="card-body">
          <h5>Status: {{ status }}</h5>
          <button class="btn btn-primary" @click="startRound">Start</button>

          <cards-component />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chat-area {
  height: 25vh;
}

.chat-area p {
  margin-bottom: 0;
}

.sections-holder {
  display: flex;
  flex-direction: row;
}
</style>