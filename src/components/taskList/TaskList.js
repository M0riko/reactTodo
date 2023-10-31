import './taskList.scss';

import Item from '../item/Item';
import { useState } from 'react';
import { deleteResource, editResource } from '../../service/getTasks';

const TaskList = ({tasks, onSetModal, SetTask, task}) => {
    const [editTask, setEditTask] = useState('');
    const handlerTask = (e, id) => { 
        if(e === 'del') {
            SetTask(task.filter(el => el.id !== id));
            deleteResource(id);
        }

        if(e === 'done') {
            SetTask(task.map(el => {
                if(el.id === id) el.done = !el.done;
                return el
            }))
        }
        
        if(e === 'edit') {
            SetTask(task.map(el => {
                if(el.id === id) {
                    el.edit = true
                    setEditTask(el.text)
                } else {
                    el.edit = false;
                }
                return el;
            }))
        }

        if(e === 'editText') {
            SetTask(task.map(el => {
                if(el.id === id && editTask !== '') {
                    el.text = editTask;
                    el.edit = false;
                }
                return el;
            }))
        }
    }
    return (
        <div className="task-list">  
            {tasks?.map(el => {
                return( <Item 
                    text={el.text} 
                    key={el.id} 
                    id={el.id} 
                    done={el.done}
                    edit={el.edit}
                    onSetText={setEditTask}
                    onSetModal={onSetModal}
                    hendlerTask={handlerTask}/>
                )
            })} 
        </div>
    );
}

export default TaskList;
