import logom from"./../assets/images/logo.png";
import Footer from './../components/footer/Footer';

import React from 'react';

const Mainpage = () => {
    
    return ( 
    <>
    <div className="container">
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        
        
        
    </div>  
    <Footer/>
    </>
     );
}
 
export default Mainpage;