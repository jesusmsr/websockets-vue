<script>
export default {
    name: 'MainPage',
    data: function () {
        return {
            room_code: ''
        }
    },
    methods: {
        createRoom() {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < 4) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }

            localStorage.setItem('roomCode', result)
            this.$router.push('/play/' + result)
        },
        joinRoom() {
            localStorage.setItem('roomCode', this.room_code)
            this.$router.push('/play/' + this.room_code)
        }

    }
}
</script>

<template>
    <div class="container">
        <div class="col-4">
            <h3>Main</h3>
            <button class="btn btn-primary" @click="createRoom">Create room</button>
            <hr>
            <div class="mb-3">
                <label for="roomCode" class="form-label">Room code</label>
                <input v-model="room_code" type="text" class="form-control" id="roomCode" placeholder="Room code">
            </div>
            <button class="btn btn-primary" @click="joinRoom">Join room</button>
        </div>

    </div>
</template>

<style>
.container {
    margin-top: 15vh
}
</style>