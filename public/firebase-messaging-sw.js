// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyCZE6z6RamPDm-X77_teGdK5_YVt2Y5x_Q",
  authDomain: "saramh-ed00f.firebaseapp.com",
  projectId: "saramh-ed00f",
  storageBucket: "saramh-ed00f.appspot.com",
  messagingSenderId: "633678844927",
  appId: "1:633678844927:web:7e56e9d32daf3c350a0dca",
  measurementId: "G-YM05RMWG2B",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log("Received background message", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(payload);
    });
  });
});
// =================================== new ==========================
