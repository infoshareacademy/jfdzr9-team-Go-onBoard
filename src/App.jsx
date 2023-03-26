import { useEffect, useState } from "react"; 
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css"; 
import { error } from "console";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import {firebase} from 'firebase/app';
/*import { database}  from 'firebase/database';*/
// simport 'firebase/database';

function App() {
  const [count, setCount] = useState(0);

/*  useEffect(() => {
      fetch("")
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })

  }, []); */
  const firebaseConfig = {
    apiKey: "AIzaSyDSwyqMv3nf_knUcjTpZ4tahlcglsPviDQ",
    authDomain: "onboarding-6610f.firebaseapp.com",
    databaseURL: "onboarding-6610f",
    projectId: "my-project",
    storageBucket: "onboarding-6610f.appspot.com",
    messagingSenderId: "775454494556",
    appId: "1:775454494556:web:e007c9e79bd84f43577b99",
    //measurementId: "G-ABCDEFGH",
  };
  useEffect(() => {
    // Inicjuj Firebase
    firebase.initializeApp(firebaseConfig);
    // Utwórz referencję do węzła, z którego chcesz pobrać dane
    const ref = firebase.database().ref('etaps');
    
    // Pobierz dane z bazy danych Firebase
    ref.once('value').then((snapshot) => {
      // Kod do obsługi pobranych danych 
      console.log(snapshot)
    }).catch((error) => {
      console.log('Wystąpił błąd: ' + error.message);
    });
  
  }, []);


  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
