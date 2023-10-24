import './appAddItem.scss'

const AppAddItem = ({newTask, onSetValue, value}) => {
    return (
        <form action="#" className="form">
            <input type="text" id="input-text" placeholder="Todo..." onChange={(e) => onSetValue(e)} value={value}/>
            <button className="btn" onClick={(e) => newTask(e)}>Add Task</button>
        </form>
    );
}

export default AppAddItem;
