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

// root.child('menu').set(null);
// for(var i=0; i<init_menu.length; i++){
//     root.child('menu').push(init_menu[i]);
// }

// root.child('user').set(null);
// for(var i=0; i<init_user.length; i++){
//     root.child('user').push(init_user[i]);
// }

root.child('menu').orderByChild('name').equalTo('Ati Ampela')
    .once('value').then(snap => {
        // snap.forEach(function(element) {
        //     console.log(element.val());
        // });
        console.log(snap.val());
})