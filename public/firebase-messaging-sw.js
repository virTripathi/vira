importScripts("https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCTAj28kbBvILbVa4s9pYCSRQhdZjtX_ew",
  authDomain: "vira-firebase.firebaseapp.com",
  projectId: "vira-firebase",
  storageBucket: "vira-firebase.firebasestorage.app",
  messagingSenderId: "369926874578",
  appId: "1:369926874578:web:f47a21282fe367317f540b",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});