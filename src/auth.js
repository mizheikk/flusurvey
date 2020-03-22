export { signIn }

function signIn(firebase) {
    return new Promise((resolve, reject) => {
       resolve(firebase.auth().signInAnonymously())
    })
}
