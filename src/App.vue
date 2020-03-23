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
        Latitude: {{ coordinates ? coordinates.coords.latitude.toFixed(2) : '' }}<br />
        Longitude: {{ coordinates ? coordinates.coords.longitude.toFixed(2) : '' }}
        </p>

        <button @click="submit">Lähetä</button>
    </div>
</template>

<script>
import { getGeolocation } from 'Utilities/location'
import { initUser } from 'Utilities/auth'
import { save } from 'Utilities/database'

export default {
    name: 'App',

    data() {

        if  (localStorage.getItem('data') !== null) {

            let data = JSON.parse(localStorage.data)

            return {
                fluStatus: null,
                age: data.age,
                postalCode: data.postalCode,
                coordinates: null,
                user: null
            }
        }

        return {
            fluStatus: null,
            age: null,
            postalCode: null,
            coordinates: null,
            user: null
        }
    },

    methods: {
        initUser: async function () {
            let user = await initUser()
            this.user = user
        },

        getPosition: async function () {
            let coords = await getGeolocation({})
            this.coordinates = coords
        },

        submit: function () {
            let data = {
                user: this.user,
                backgroundInfo: {
                    age: this.age,
                    postalCode: this.postalCode
                },
                answer: {
                    fluStatus: this.fluStatus,
                    coordinates: {
                        latitude: this.coordinates.coords.latitude.toFixed(2),
                        longitude: this.coordinates.coords.longitude.toFixed(2)
                    },
                    time: Date.now()
                }
            }

            return save(data)
        }
    },

    mounted() {
        this.initUser()
        this.getPosition()
    }
}
</script>
