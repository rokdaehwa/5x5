import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

var firebaseConfig = {
	apiKey: 'AIzaSyAH_CvOb0CqqzyQeONluFjiasCaf2H1Zj8',
	authDomain: 'five-x-five.firebaseapp.com',
	projectId: 'five-x-five',
	storageBucket: 'five-x-five.appspot.com',
	messagingSenderId: '830198825383',
	appId: '1:830198825383:web:dbb112610caa47598bb682',
	measurementId: 'G-MEFDVZW0X7',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export const database = firebase.firestore();
export default firebase;