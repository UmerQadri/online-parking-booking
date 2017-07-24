import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAQI5ZYLm4r5ahpSZQbCEKoZMJRX_CiJzQ",
    authDomain: "first-firebase-f1c18.firebaseapp.com",
    databaseURL: "https://first-firebase-f1c18.firebaseio.com",
    storageBucket: "first-firebase-f1c18.appspot.com",
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot){

  module.hot.accept();

}

registerServiceWorker();
