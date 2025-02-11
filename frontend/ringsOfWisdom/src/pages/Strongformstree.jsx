import dish from"./../assets/images/dish.png";
import icon_gendr_forms from"./../assets/images/icon_gendr_forms.png";
import many_faces from"./../assets/images/many_faces.png";
import reverse_x from"./../assets/images/reverse_x.png";
import './../assets/style/style_skills_tree.css';

import { NavLink } from 'react-router-dom';
import React from 'react';

const Strongformstree = () => {
    return ( <div className="container_all">
        <div className="head">
            <p>Могучие Формы</p>
        </div>
        <div className="container_first">
            <NavLink  to="/quiz" className="item">
                <img src={icon_gendr_forms} alt="ГЕНдерные Формы"/>
                <p>ГЕНдерные<br/>Формы</p>
            </NavLink>
        </div>
        <div className="container_second">
            
           <NavLink  to="/skillwp" className="item">
                <img src={reverse_x} alt="Замена НЕизвестного"/>
                <p>Замена<br/>НЕизвестного</p>
            </NavLink>
            
        
            <NavLink  to="/skillwp" className="item">
                <img src={many_faces} alt="Много Лицые"/>
                <p>МногоЛикие</p>
            </NavLink>
            
        </div>
        <div className="container_last">
            <NavLink  to="/skillwp" className="item">
                <img src={dish} alt="Первые и вторые блюда"/>
                <p>Первые и Вторые<br/>блюда</p>
            </NavLink>
        </div>
    </div> 
    );
}
 
export default Strongformstree ;