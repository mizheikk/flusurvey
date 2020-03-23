import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import { firebaseConfig } from 'Utilities/firebase_config'

firebase.initializeApp(firebaseConfig)

export { firebase }
