import './item.scss';

import change from '../../img/change.png'
import dones from '../../img/done.png'
import dalete from '../../img/dalete.png'

const Item = ({text, id, done, edit, onSetText, onSetModal, hendlerTask}) => {
    return (
        <div id={id} className={`addTask task`} style={{display: 'flex'}}>
                <form action="#" className={`change-task ${edit === false ? 'none' : ''}`}>
                <input type="text" id="change-text" onChange={(e) => onSetText(e.target.value)} defaultValue={text}/>
                <button className="doneChange" onClick={() => hendlerTask('editText', id)}>EDIT</button>
                </form>
                    <div className={`task-text ${done && 'line'} ${edit === false ? '' : 'none'}`} onClick={() => onSetModal(text)}>{text.length > 13 ? `${text.slice(0, 13)}...` : text}</div>
                    <div className="task-buttons">
                    <button className="change" onClick={() => hendlerTask('edit', id)}><img src={change} alt="change"/></button>
                    <button className="done" onClick={() => hendlerTask('done', id)}><img src={dones} alt="change"/></button>
                    <button className="del" onClick={() => hendlerTask('del', id)}><img src={dalete} alt="change"/></button>
                </div>
        </div>
    );
}

export default Item;
