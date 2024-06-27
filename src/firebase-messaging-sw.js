

// importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js');

// firebase.initializeApp({
//   apiKey: "AIzaSyDiGz2rnAixEWGkM1gJjxXFeWS2zTa0dc4",
//   authDomain: "exwise-32efe.firebaseapp.com",
//   projectId: "exwise-32efe",
//   storageBucket: "exwise-32efe.appspot.com",
//   messagingSenderId: "192664395108",
//   appId: "1:192664395108:web:9db18d4d59c36a8cb46e71",
//   measurementId: "G-1VTMPW9LW5"
// });

// const messaging = firebase.messaging();
// console.log(messaging);



// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDiGz2rnAixEWGkM1gJjxXFeWS2zTa0dc4",
  authDomain: "exwise-32efe.firebaseapp.com",
  projectId: "exwise-32efe",
  storageBucket: "exwise-32efe.appspot.com",
  messagingSenderId: "192664395108",
  appId: "1:192664395108:web:9db18d4d59c36a8cb46e71",
  measurementId: "G-1VTMPW9LW5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
