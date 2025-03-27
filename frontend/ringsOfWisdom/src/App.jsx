import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './hooks/AuthContext';

import "./assets/style/style_main_page.css";
import './App.css';
import Head from './components/header/Head';
import Mainpage from './pages/Mainpage';
import Shop from './pages/Shop';
import Courses from './pages/Courses';
import Skillstree from './pages/Skillstree';
import Strongformstree from './pages/Strongformstree';
import Emailverif from './pages/Emailverif';
import EmailCompleted from './pages/EmailCompleted';
import Registation from './pages/Registration';
import Authorization from './pages/Authorization';
import Quez from './pages/Quez';
import Type_and_Types from './pages/Type_and_Types';
import Profile from './pages/Profile';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Head />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/types" element={<Type_and_Types />} />
          <Route path="/reg" element={<Registation />} />
          <Route path="/auth" element={<Authorization />} />
          <Route path="/emlverif" element={<Emailverif />} />
          <Route path="/confirm-email" element={<EmailCompleted />} />
          <Route path="/skills" element={<Skillstree />} />
          <Route path="/stngform" element={<Strongformstree />} />
          <Route path="/quiz/:quizName" element={<Quez />} />
          <Route path="/quiz" element={<Quez />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
