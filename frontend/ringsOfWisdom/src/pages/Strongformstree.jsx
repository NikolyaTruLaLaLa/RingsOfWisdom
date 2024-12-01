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
            <div className="item">
                <a href = "#reverse_x">
                    <img src={reverse_x} alt="Замена НЕизвестного"/>
                </a>
                <p>Замена<br/>НЕизвестного</p>
            </div>
        
            <div className="item">
                <a href = "#many_faces">
                    <img src={many_faces} alt="Много Лицые"/>
                </a>
                <p>МногоЛикие</p>
            </div>
        </div>
        <div className="container_last">
            <div className="item">
                <a href = "#dish">
                    <img src={dish} alt="Первые и вторые блюда"/>
                </a>
                <p>Первые и Вторые<br/>блюда</p>
            </div>
        </div>
    </div> 
    );
}
 
export default Strongformstree ;