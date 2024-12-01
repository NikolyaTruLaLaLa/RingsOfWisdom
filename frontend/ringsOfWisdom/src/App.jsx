import { useState } from 'react'
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

       <Head />

      {/*<WPM />*/}
      {/*<WPC />*/}
      {/*<WPS />*/}
      
      {/*<Registation />*/}
      {/*<Authorization />*/}
      {/*<Emailverif/>*/}
      
      {/*<Skillstree />*/}
      {/*<Strongformstree />*/}
      <Quez />

      
    </>
  )
}

export default App
