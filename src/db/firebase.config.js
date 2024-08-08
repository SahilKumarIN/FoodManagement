// firebase.js
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDn7GMDuojvK-9bmLmSzlXctAko4hv3dSE',
  authDomain: 'restro-food-management.firebaseapp.com',
  databaseURL:
    'https://restro-food-management-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'restro-food-management',
  storageBucket: 'restro-food-management.appspot.com',
  messagingSenderId: '316186592940',
  appId: '1:316186592940:web:c0c6a34a1cc05ff46bc109',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {app, database};
