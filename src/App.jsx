import React from 'react';
import './App.css';
import Home from './Pages/Home.jsx';
import { MusicProvider } from './Context/MusicContext.jsx';



function App() {
  return (
  <MusicProvider>
    <Home />
  </MusicProvider>
  );
}


export default App;
