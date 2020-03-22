export { signIn }

function signIn(firebase) {
    return firebase.auth().signInAnonymously()
}
