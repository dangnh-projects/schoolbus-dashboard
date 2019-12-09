import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCRI38F5LbIQGGlXi2J_u8GldB2gTQe8uk',
  authDomain: 'AUTH_DOMAIN',
  databaseURL: 'https://ischoolbus-321ad.firebaseio.com',
  projectId: 'ischoolbus-321ad',
  storageBucket: 'ischoolbus-321ad.appspot.com',
  messagingSenderId: 'MESSAGING_SENDER_ID',
  appId: 'APP ID',
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
