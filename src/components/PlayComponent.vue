<script>
export default {
    name: 'PlayComponent',
    data: function () {
        return {
            username: '',
            password: '',
            connection: null,
            room_code: '',
            user_id: '',
            connected: false,
            players: [],
            room_name: ''
        }
    },
    methods: {
        submitName() {
            localStorage.setItem('userSettings', JSON.stringify({
                nickname: this.username
            }));

            this.room_code = localStorage.getItem('roomCode');
            this.user_id = localStorage.getItem('userId');

            fetch('http://127.0.0.1:8000/chat/rooms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'room': {
                        'room_code': this.room_code,
                        'max_players': 5,
                        'is_active': 'true'
                    }
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.connection = new WebSocket('ws://127.0.0.1:8000/ws/room/' + this.room_code + '/');
                    this.connection.onopen = (event) => {
                        console.log('Succesfsully connected to room ' + this.room_code);
                        this.connected = true;
                        this.connection.send(
                            JSON.stringify({
                                joinRoom: {
                                    room_code: this.room_code,
                                    user_id: this.user_id,
                                    nickname: this.username
                                }
                            })
                        );
                    };

                    this.connection.onmessage = (event) => {
                        const data = JSON.parse(event.data);
                        console.log(data);
                        this.room_name = data.room_name;
                        this.players = JSON.parse(data.players);
                    }
                })


        }
    },
    created() {
        let settings = JSON.parse(localStorage.getItem('userSettings'))
        this.username = settings.nickname;
    }
}
</script>

<template>
    <div class="container">
        <div v-if="!connected" class="card">
            <h5 class="card-header">Play</h5>
            <div class="card-body">
                <form @submit.prevent="submitName">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="Username">
                    </div>
                    <button class="btn btn-primary" type="submit">Play</button>
                </form>
            </div>
        </div>
        <div v-if="connected">
            <h3>{{ room_name }}</h3>
            <div class="user-list">
                <div v-for="player in players" :key="player.userId">
                    {{ player.nickname }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin-top: 15vh;
}

.user-list {
    background-color: #f5f5f5;
    height: 15vh;
}

.login-link:hover {
    color: #4c5d93;
    cursor: pointer;
}
</style>