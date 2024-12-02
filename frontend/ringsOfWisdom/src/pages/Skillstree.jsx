import group from"./../assets/images/group.png";
import people from"./../assets/images/people.png";
import unlock from"./../assets/images/unlock.png";
import './../assets/style/style_skills_tree.css';

import { NavLink } from 'react-router-dom';
import React from 'react';

const Skillstree = () => {
    return (
     <div className="container_all">
        <div className="head">
            <p>Дерево Навыков</p>
        </div>
        <div className="container_first">
            <NavLink  to="/stngform" className="item">
                <img src={group} alt="Могучие Формы"/>
                <p>Могучие<br/>Формы</p>
            </NavLink>
        </div>
        <div className="container_second">
            <NavLink  to="/skillwp" className="item">
                <img src={people} alt="Типы Типочки"/>
                <p>Типы<br/>Типочки</p>
            </NavLink>
            
            <NavLink  to="/skillwp" className="item">
                <img src={unlock} alt="База"/>
                <p>База</p>
            </NavLink>
            
        </div>
        <div className="container_last">
            <NavLink  to="/skillwp" className="item">
                <img src={unlock} alt="Bossmusic"/>
                <p>Bossmusic</p>
            </NavLink>
        </div>
    </div> 
    );
}
 
export default Skillstree;