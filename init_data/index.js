// Initialize Firebase
var config = {
    apiKey: "AIzaSyCmGSQ1w8Qnx78sJIpvYdXhPWfBUeRz_uE",
    authDomain: "kepesen-47fcd.firebaseapp.com",
    databaseURL: "https://kepesen-47fcd.firebaseio.com",
    projectId: "kepesen-47fcd",
    storageBucket: "kepesen-47fcd.appspot.com",
    messagingSenderId: "167368791399"
};
firebase.initializeApp(config);

var root = firebase.database().ref();

// root.child('menu').on('value', snap => {
//     console.log(snap.val());
//     let x = [];
//     let k = Object.keys(snap.val());
//     for(let i=0; i<k.length; i++){
//         x.push(snap.val()[k[i]]);
//     }
//     console.log(JSON.stringify(x));
// });

root.child('menu').set(null);
for(var i=0; i<init_menu.length; i++){
    root.child('menu').push(init_menu[i]);
}

// root.child('user').set(null);
// for(var i=0; i<init_user.length; i++){
//     root.child('user').child(init_user[i].username).set({
//         password : init_user[i].password,
//         role : init_user[i].role,
//         active : init_user[i].active,
//         name : init_user[i].name,
//     })
// }