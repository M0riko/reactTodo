import './taskList.scss';

import Item from '../item/Item';
import Pagination from '../pagination/Pagination'
import Modal from '../modal/modal';

import { useState } from 'react';
import { deleteResource, editResource } from '../../service/getTasks';

const TaskList = ({SetTask, task}) => {
    
    const [editTask, setEditTask] = useState('');

    const [showTask, setShowTask] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const [modalText, setModalText] = useState('');

    const handlerTask = (e, id, event) => { 
        if(e === 'del') {
            SetTask(task.filter(el => el.id !== id));
            deleteResource(id);
        }

        if(e === 'done') {
            SetTask(task.map(el => {
                if(el.id === id) el.done = !el.done;
                return el
            }))
            editResource(id, task.find(el => el.id === id));
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
            event.preventDefault()
            SetTask(task.map(el => {
                if(el.id === id && editTask !== '') {
                    el.text = editTask;
                    el.edit = false;
                }
                return el;
            }))
            editResource(id, task.find(el => el.id === id));
        }
    }

    const onSetModal = (value) => {
        setOpenModal(openModal => !openModal);
        setModalText(value);
    } 

    return (
        <>
        <div className="task-list">  
            {showTask?.map(el => {
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
        <Pagination filterTask={task} setShowTask={setShowTask}/>
        {openModal && <Modal onSetModal={onSetModal} text={modalText}/>}
        </>
    );
}

export default TaskList;
