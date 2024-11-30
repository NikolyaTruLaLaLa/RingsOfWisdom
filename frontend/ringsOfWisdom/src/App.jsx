import { useState } from 'react'
import "./assets/style/style_main_page.css";

import './App.css'

import Head from './components/header/Head'
import Headcontainer from './components/header-container/Headcontainer';
import Maincontent from './components/main-content/Maincontent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

       <Head />
    
      <Headcontainer />
      
      <Maincontent />
    </>
  )
}

export default App
