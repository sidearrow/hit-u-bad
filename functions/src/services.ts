import * as admin from 'firebase-admin';

admin.initializeApp();

const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});

export { firestore };
