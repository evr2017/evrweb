const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//request for creating main
exports.createMain = functions.https.onRequest((req, res) => {
  const name = req.query.name;
  const desc = req.query.desc;
  const bg = req.query.bg;

  admin.database().ref('/main').push({name: name, desc: desc, bg: bg}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

//request for creating sub
exports.createSub = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const mainId = req.query.mainId; //foreign key
  const name = req.query.name;
  const type = req.query.type;
  const img = req.query.img;
  const x = req.query.x;
  const y = req.query.y;
  const z = req.query.z;
  const rotation = req.query.rotation;
  const nextId = req.query.nextId; //id of the next main

  admin.database().ref('/sub').push({mainId: mainId, name: name, type: type, img: img, x: x, y: y, z: z, rotation: rotation, nextId: nextId}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

