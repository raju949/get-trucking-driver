import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

  const firebaseConfig = {
    apiKey: "AIzaSyAf4iEkzSAtQw1YD2OLpxu0GwCzywPbwWQ",
    authDomain: "get-trucking-c0435.firebaseapp.com",
    projectId: "get-trucking-c0435",
    storageBucket: "get-trucking-c0435.appspot.com",
    messagingSenderId: "602205919632",
    appId: "1:602205919632:web:f20616ce8e64f35159fb15"
  };
  


  let app;
  if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  }else{
    app = firebase.app()
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db,auth};
