import group from"./../assets/images/group.png";
import people from"./../assets/images/people.png";
import unlock from"./../assets/images/unlock.png";
import './../assets/style/style_skills_tree.css';

const Skillstree = () => {
    return (
     <div className="container_all">
        <div class ="head">
            <p>Дерево Навыков</p>
        </div>
        <div className="container_first">
            <div className="item">
                <a href = "#group">
                    <img src={group} alt="Могучие Формы"/>
                </a>
                <p>Могучие<br/>Формы</p>
            </div>
        </div>
        <div className="container_second">
            <div className="item">
                <a href = "#people">
                    <img src={people} alt="Типы Типочки"/>
                </a>
                <p>Типы<br/>Типочки</p>
            </div>
        
            <div className="item">
                <a href = "#baze">
                    <img src={unlock} alt="База"/>
                </a>
                <p>База</p>
            </div>
        </div>
        <div className="container_last">
            <div className="item">
                <a href = "#bossmusic">
                    <img src={unlock} alt="Bossmusic"/>
                </a>
                <p>Bossmusic</p>
            </div>
        </div>
    </div> 
    );
}
 
export default Skillstree;