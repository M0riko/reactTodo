import './header.scss'
import change from '../../img/change.png'

const Header = ({totalTask}) => {
    return (
            <div className="header">
                <div className="header-text">ToDoList</div> 
                <button id="change-header">
                    <img src={change} alt="change" />
                </button>
            <div className="total">ToDo: {totalTask.length}</div>
            </div>
    );
}

export default Header;
