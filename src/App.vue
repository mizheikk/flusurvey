<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-narrow">

                <div class="container">

                    <h1 class="title">Flusurvey</h1>

                    <div class="field">
                        <label class="label">Onko flunssaoireita?</label>
                        <div class="control">
                            <label for="fluPositive" class="radio">
                                <input type="radio" id="fluPositive" value="1" v-model="fluStatus">
                                Kyllä
                            </label>
                            <label for="fluNegative" class="radio">
                                <input type="radio" id="fluNegative" value="0" v-model="fluStatus">
                                Ei
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <label for="age" class="label">Ikä</label>
                        <div class="control">
                            <input class="input" type="number" step="1" id="age" v-model="age">
                        </div>
                    </div>

                    <div class="field">
                        <label for="postalCode" class="label">Postinumero</label>
                        <div class="control">
                            <input class="input" type="text" id="postalCode" v-model="postalCode">
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-primary" @click="submit">Lähetä</button>
                        </div>
                        <div class="control">
                            <button class="button is-warning" @click="clearFields">Tyhjennä kentät</button>
                        </div>
                    </div>

                    <p>Koordinaatit:<br />
                        Latitude: {{ coordinates ? coordinates.coords.latitude.toFixed(2) : '' }}<br />
                        Longitude: {{ coordinates ? coordinates.coords.longitude.toFixed(2) : '' }}
                    </p>

                </div>
            </div>
        </div>
    </section>
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
        },

        clearFields: function () {
            this.fluStatus = null
            this.age = null
            this.postalCode = null
        }
    },

    mounted() {
        this.initUser()
        this.getPosition()
    }
}
</script>
