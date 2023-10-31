import { useState } from 'react';
import './appAddItem.scss'
import { postTodo } from '../../service/getTasks';

const AppAddItem = ({onSetTask}) => {
    const [value, setValue] = useState('');

    const newTask = (e, text) => {
        e.preventDefault();
        const uId = Math.floor(Math.random() * 1000000) + 1;
        const newTask = {id: uId, text: text, done: false, edit: false};
        if(text.length !== 0) {
            onSetTask(task => ([...task, newTask]))
            setValue('')
        }
        postTodo(newTask)
        return newTask;
    }
        
    return (
        <form action="#" className="form">
            <input type="text" id="input-text" placeholder="Todo..." onChange={(e) => setValue(e.target.value)} value={value}/>
            <button className="btn" onClick={(e) => newTask(e, value)}>Add Task</button>
        </form>
    );
}

export default AppAddItem;
