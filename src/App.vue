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

        <p>Koordinaatit:<br />
        Latitude: {{ coordinates ? coordinates.coords.latitude : '' }}<br />
        Longitude: {{ coordinates ? coordinates.coords.longitude : '' }}
        </p>

        <button @click="submit">Lähetä</button>
    </div>
</template>

<script>
import { getGeolocation } from './location'

export default {
    name: 'App',

    data() {
        return {
            fluStatus: null,
            age: null,
            postalCode: null,
            coordinates: null
        }
    },

    methods: {
        getPosition: async function () {
            let coords = await getGeolocation({})
            this.coordinates = coords
        },

        submit: function () {
            alert('TALLENNETAAN!')
        }
    },

    mounted() {
        this.getPosition()
    }
}
</script>
