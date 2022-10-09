import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
// // console.log(process.env.REACT_APP_FIREBASE_CONFIG);
// const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG;
// .env로 써서 깃에 안올라가게 하려 했는데 안됨 오브젝트로는 못 넣는듯?

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
}

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

const TEAM = firestore.collection("teams").doc(process.env.REACT_APP_FIREBASE_TEAM_ID);
// const TEAM = firestore.collection("teams").doc('mBoNPzkybOUeD9UJH9w1');
const USER = TEAM.collection('User');
const NOTICE = TEAM.collection('Notice');
const SCHEDULE = TEAM.collection('Schedule');
const QUESTION = TEAM.collection('Question');
const ANSWER = TEAM.collection('Answer');
const PROFILE = TEAM.collection('Profile');
const COUNTER = TEAM.collection('Counter');
const EXECUTIVE = TEAM.collection('Executive');
const COMMITTEE = TEAM.collection('Committee');

// 필요한 곳에서 사용할 수 있도록 내보내기
export { storage, firestore, auth, EXECUTIVE, COMMITTEE, TEAM, USER, NOTICE, SCHEDULE, QUESTION, ANSWER, PROFILE, COUNTER };

