<template>
    <div>
        <p>Onko flunssaoireita?</p>

        <input type="radio" id="fluPositive" value="1" v-model="fluStatus">
        <label for="fluPositive">Kyllä</label>

        <input type="radio" id="fluNegative" value="0" v-model="fluStatus">
        <label for="fluNegative">Ei</label>

        <br />

        <label for="age">Ikä</label>
        <input type="number" id="age" step="1" v-model="age">

        <br />

        <label for="postalCode">Postinumero</label>
        <input type="text" id="postalCode" v-model="postalCode">
    </div>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {
            fluStatus: null,
            age: null,
            postalCode: null
        }
    }
}
</script>
