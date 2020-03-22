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
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { getGeolocation } from './location'
import { signIn } from './auth'

const firebaseConfig = {
  apiKey: "AIzaSyAr4NYGEctzvYqf8oKSOpTLWK71630GD80",
  authDomain: "flusurvey-1f96b.firebaseapp.com",
  databaseURL: "https://flusurvey-1f96b.firebaseio.com",
  projectId: "flusurvey-1f96b",
  storageBucket: "flusurvey-1f96b.appspot.com",
  messagingSenderId: "1006223751736",
  appId: "1:1006223751736:web:8280c12956d775d9f144cd",
  measurementId: "G-VM9L5YSEKN"
}

firebase.initializeApp(firebaseConfig)

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

        signIn: async function () {
            this.user = await signIn(firebase)
            console.log(this.user)
        },

        getPosition: async function () {
            let coords = await getGeolocation({})
            this.coordinates = coords
        },

        submit: function () {
            alert('TALLENNETAAN!')
        }
    },

    mounted() {

        this.signIn(firebase)
        this.getPosition()
    }
}
</script>
