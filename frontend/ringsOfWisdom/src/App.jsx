import { useState } from 'react'
import "./assets/style/style_main_page.css";

import './App.css'

import Head from './components/header/Head'
import Wp from './pages/WP';
import Skillstree from './pages/Skillstree';
import Strongformstree from './pages/Strongformstree';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

       <Head />
    
      {/*<Wp />*/}
      {/*<Skillstree />*/}
      <Strongformstree />
      
    </>
  )
}

export default App
