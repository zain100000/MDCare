// services/firebaseMessaging.js
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
});

function sendFCMMessage(token, dataPayload) {
  const message = {
    token,
    data: dataPayload,
    android: {
      priority: 'high',
    },
  };

  return admin.messaging().send(message);
}

module.exports = { sendFCMMessage };
