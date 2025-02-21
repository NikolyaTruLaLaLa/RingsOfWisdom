import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./assets/style/style_main_page.css";

import './App.css'

import Head from './components/header/Head';
/*import Footer from './components/footer/Footer';*/
import WPM from './pages/WPM';
import WPC from './pages/WPC';
import WPS from './pages/WPS';
import Skillstree from './pages/Skillstree';
import Strongformstree from './pages/Strongformstree';
import Emailverif from './pages/Emailverif';
import EmailCompleted from './pages/EmailCompleted';
import Registation from './pages/Registration';
import Authorization from './pages/Authorization';
import Quez from './pages/Quez';
import WPSK from './pages/WPSK';

function App() {
 
  return (
    <>

    <Router>
        <Head />
        <Routes>
          <Route path="/main" element={<WPM />} />
          <Route path="/course" element={<WPC />} />
          <Route path="/shop" element={<WPS />} />
          <Route path="/skillwp" element={<WPSK />} />
          <Route path="/reg" element={<Registation />} />
          <Route path="/auth" element={<Authorization />} />
          <Route path="/emlverif" element={<Emailverif/>} />
          <Route path="/confirm-email" element={<EmailCompleted/>} />
          <Route path="/skills" element={<Skillstree />} />
          <Route path="/stngform" element={<Strongformstree />} />
          <Route path="/quiz" element={<Quez />} />
        </Routes>
        {/*<Footer/>*/}
    </Router>

       

      
    </>
  )
}

export default App
