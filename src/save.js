export { save }

function save(firebase, data) {

    let db = firebase.firestore()
    let userId = data.user.uid

    addCollection(db, userId, data.backgroundInfo)
    addAnswer(db, userId, data.answer)
}

function addCollection(db, userId, data) {
    db.collection('users').doc(userId).set(data, { merge: true })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    })
}

function addAnswer(db, userId, answer) {
    db.collection('users').doc(userId).collection('answers').add(answer)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });    
}