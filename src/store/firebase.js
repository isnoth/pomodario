import firebase from "firebase";  

const firebaseConfig_dev = {
    apiKey: "AIzaSyDMGya80Zqfmo7_VpFjUg7vrpV8GfS9pgw",
    authDomain: "bn5x-dev.firebaseapp.com",
    databaseURL: "https://bn5x-dev.firebaseio.com",
    projectId: "bn5x-dev",
    storageBucket: "",
    messagingSenderId: "895661616341",
    appId: "1:895661616341:web:a3bb57b24ede661a"
};

const firebaseConfig_prod = {
    apiKey: "AIzaSyACjJ3HisGwDpo7pMAQr5elGGv57FEpWcQ",
    authDomain: "bn5x-prod.firebaseapp.com",
    databaseURL: "https://bn5x-prod.firebaseio.com",
    projectId: "bn5x-prod",
    storageBucket: "bn5x-prod.appspot.com",
    messagingSenderId: "1050234679128",
    appId: "1:1050234679128:web:827a3de9f64d57c5"
};

const isDev = 'development' === process.env.NODE_ENV

// Initialize Firebase
const proj = firebase.initializeApp(isDev? firebaseConfig_dev : firebaseConfig_prod);

const root = firebase.database().ref();
const todos = firebase.database().ref('test');

window.wilddog = firebase
window.todos = todos
window.rootRef = root

const Fb = {
  Wilddog: firebase,
  root,
  todos
};


export { Fb };
