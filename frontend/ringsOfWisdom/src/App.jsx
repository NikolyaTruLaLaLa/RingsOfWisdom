import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./assets/style/style_main_page.css";

import './App.css'

import Head from './components/header/Head'
import WPM from './pages/WPM';
import WPC from './pages/WPC';
import WPS from './pages/WPS';
import Skillstree from './pages/Skillstree';
import Strongformstree from './pages/Strongformstree';
import Emailverif from './pages/Emailverif';
import Registation from './pages/Registration';
import Authorization from './pages/Authorization';
import Quez from './pages/Quez';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Router>
        <Head />
        <Routes>
          <Route path="/main" element={<WPM />} />
          <Route path="/course" element={<WPC />} />
          <Route path="/shop" element={<WPS />} />
          <Route path="/reg" element={<Registation />} />
          <Route path="/auth" element={<Authorization />} />
          <Route path="/emlverif" element={<Emailverif/>} />
          <Route path="/skills" element={<Skillstree />} />
          <Route path="/stngform" element={<Strongformstree />} />
          <Route path="/quiz" element={<Quez />} />
        </Routes>
    </Router>

       

      
    </>
  )
}

export default App
