import group from"./../assets/images/group.png";
import people from"./../assets/images/people.png";
import bingo from"./../assets/images/bingo.png";
import takeOrNo from"./../assets/images/takeOrNo.png";
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
            <NavLink  to="/stngform" className="skil-cont">
                <img src={group} alt="Могучие Формы"/>
                <p>Могучие<br/>Формы</p>
            </NavLink>
        </div>
        <div className="container_second">
            <NavLink  to="/types" className="skil-cont">
                <img src={people} alt="Типы Типочки"/>
                <p>Типы<br/> и Типочки</p>
            </NavLink>
            
            <NavLink to="/bingo" className="skil-cont">
                <img src={bingo} alt="Бинго"/>
                <p>Это Бинго!</p>
            </NavLink>
            
        </div>
        <div className="container_last">
            <NavLink to="/takeOrNoTake" className="skil-cont">
                <img src={takeOrNo} alt="Возьмешь или не возьмешь?"/>
                <p>Возьмëшь <br/>не возьмëшь?</p>
            </NavLink>
        </div>
    </div> 
    );
}
 
export default Skillstree;