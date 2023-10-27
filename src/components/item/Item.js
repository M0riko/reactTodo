import './item.scss';

import change from '../../img/change.png'
import dones from '../../img/done.png'
import dalete from '../../img/dalete.png'

const Item = ({text, id, done, sesss, del, edit, edits, editText, onSetText, onSetModal}) => {
    return (
        <div id={id} className={`addTask task`} style={{display: 'flex'}}>
                <form action="#" className={`change-task ${edit === false ? 'none' : ''}`}>
                <input type="text" id="change-text" onChange={(e) => onSetText(e)} defaultValue={text}/>
                <button className="doneChange" onClick={editText}>EDIT</button>
                </form>
                    <div className={`task-text ${done && 'line'} ${edit === false ? '' : 'none'}`} onClick={onSetModal}>{text.length > 17 ? `${text.slice(0, 17)}...` : text}</div>
                    <div className="task-buttons">
                    <button className="change" onClick={edits}><img src={change} alt="change"/></button>
                    <button className="done" onClick={sesss}><img src={dones} alt="change"/></button>
                    <button className="del" onClick={del}><img src={dalete} alt="change"/></button>
                </div>
        </div>
    );
}

export default Item;
