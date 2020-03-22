// import Vue from 'vue'
// import App from './App'

// new Vue({
//     el: '#app',
//     render: h => h(App)
// })

console.log('hey')

let test = {
    test: "asdfsdf"
}

let another = {
    ...test,
    ...{
        newkey: 'adsfasdf'
    }
}

console.log(another)
