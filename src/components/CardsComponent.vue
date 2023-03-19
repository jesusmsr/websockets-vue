<script>
export default {
    name: 'CardsComponent',
    data: function () {
        return {

        }
    },
    methods: {

    }
}

</script>
<template>
    <div class="cards-holder">
        <div class="card-item"></div>
        <div class="card-item"></div>
    </div>
</template>

<style>
.cards-holder {
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin-top: 20px;
}

.card-item {
    height: 150px;
    width: 120px;
    background-color: rgb(166, 0, 255);
    border-radius: 10px;
}

.card-item:hover {
    border: 5px solid rgb(182, 120, 211);
    border-radius: 10px;
    cursor: pointer;
}
</style>