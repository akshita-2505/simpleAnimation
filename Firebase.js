import * as Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBDVPJwo5M43ysawjZSgd11cQbFDIqi7u0",
    authDomain: "fir-demo-4bc9c.firebaseapp.com",
    databaseURL: "https://fir-demo-4bc9c.firebaseio.com/",
    projectId: "fir-demo-4bc9c",
    storageBucket: "fir-demo-4bc9c.appspot.com",
    messagingSenderId: "143349828587"
};

let app = Firebase.initializeApp(config);
export const db = app.database();