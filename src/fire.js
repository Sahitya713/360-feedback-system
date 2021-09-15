import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAUDOnG3w4H8ojeKw4BW9UvNPheuvg3fEE",
  authDomain: "burning-bridges.firebaseapp.com",
  databaseURL: "https://burning-bridges-default-rtdb.firebaseio.com",
  projectId: "burning-bridges",
  storageBucket: "burning-bridges.appspot.com",
  messagingSenderId: "349125635542",
  appId: "1:349125635542:web:983af13b1c48d5ad738877",
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

//   export default fireDB.database().ref();
export default fireDB;
// export default firebaseConfig
