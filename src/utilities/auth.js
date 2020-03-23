import { firebase } from 'Utilities/firebase'

export async function initUser() {
    await signIn(firebase)

    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

function signIn() {
    return firebase.auth().signInAnonymously()
}
