import './app.scss'

import { useState, useEffect, useMemo } from 'react';

import GetTasks from '../../service/getTasks';

import Header from '../header/Header';
import AppSort from '../appSort/AppSort';
import AppAddItem from '../appAddItem/AppAddItem'
import TaskList from '../taskList/TaskList';
import Pagination from '../pagination/Pagination'
import Modal from '../modal/modal'
import Error from '../error/Error';
const itemsPerPage = 4;

const App = () => {

    const getTasks = new GetTasks();

    const onRequest = () => {
        getTasks
            .getResource('http://localhost:3000/tasks')
                .then(res => res.json())
                .then(SetTask)
                .catch(res => console.log('error'))

    }

    useEffect(() => {
        onRequest();
    }, [])

    const postTask = (arr) => {
            getTasks
            .postResource('POST', 'http://localhost:3000/tasks', arr)
                .then(data => JSON.stringify(data))
                .then(data => data)
                .catch(res => console.log('error'))
    }

    const onEdit = (id, task) => {
        getTasks
            .editResource(id, task)
    }

    const onDelete = (id) => {
        getTasks
            .deleteResource('http://localhost:3000/tasks', id)
    } 

    const [task, SetTask] = useState([]);

    const [value, SetValue] = useState('');

    const [filter, setFilter] = useState('default');

    const [editTask, setEditTask] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const [openModal, setOpenModal] = useState(false);

    const [modalText, setModalText] = useState('');

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const filterTodoTask = useMemo(() => {
        if(filter === 'default') {
            return task;
        }

        if(filter === 'true') {
            return task.filter(e => e.done === true);
        }

        if(filter === 'false') {
            return task.filter(e => e.done === false);
        }
        
    }, [task, filter])

    const filterTodoItems = filterTodoTask.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(task));
        if(task.length === 4) {
            setCurrentPage(1)
        }
    }, [task])
    
    const newTask = (e, text) => {
        e.preventDefault();
        const uId = Math.floor(Math.random() * 1000000) + 1;
        const newTask = {id: uId, text: text, done: false, edit: false};
        if(text.length !== 0) {
            SetTask(task => ([...task, newTask]))
            SetValue('')
            postTask(newTask)
        }
        return newTask;
    }

    const hendlerTask = (e, id) => { 
        switch (e) {
            case 'del': 
                const filterTask = task.filter(el => el.id !== id);
                SetTask(filterTask)
                onDelete(id)
            break;
            case 'done' : 
                const doneTask = task.map(el => {
                    if(el.id === id) {
                        el.done = !el.done
                    }
        
                    return el;
                })
                SetTask(doneTask)
                onEdit(id, ...task.filter(el => el.id === id))
            break;
            case 'edit' : 
                SetTask(task.map(el => {
                    if(el.id === id) {
                        el.edit = !el.edit
                    } else {
                        el.edit = false;
                        setEditTask('')
                    }
                    return el;
                }))
            break;
            case 'editText' :
                SetTask(task.map(el => {
                    if(el.id === id && editTask !== '') {
                        el.text = editTask;
                    }
                    return el;
                }))

                SetTask(task.map(el => {
                    if(el.id === id) {
                        el.edit = false
                    }
                    return el;
                }))
                onEdit(id, ...task.filter(el => el.id === id))

                break;
            default: console.log(0);
        }
    }

    const onSetFilter = (e) => {
        const value = e.target.value;
        setFilter(value)
    }

    const onSetModal = (value) => {
        const text = value
        setOpenModal(openModal => !openModal);
        setModalText(text);
    } 

    const onSetText = (e) => {
        const text = e.target.value;
        setEditTask(text)
    }

    const onSetValue = (e) => {
        const text = e.target.value;
        SetValue(text)
    }

    return (
        <div className='container'>
            <Header totalTask={task}/>
            <div className="content">
                <AppSort onSetFilter={onSetFilter}/>

                <AppAddItem 
                    newTask={(e) => newTask(e, value)}
                    value={value}
                    onSetValue={(e) => onSetValue(e)}/>

                {filterTodoTask.length < 1 ? <Error/> :<TaskList 
                    tasks={filterTodoItems} 
                    hendlerTask={hendlerTask} 
                    onSetText={onSetText}
                    onSetModal={onSetModal}/>}

                {filterTodoTask.length > 4 && <Pagination 
                                                    itemsPerPage={itemsPerPage} 
                                                    totalItems={filterTodoTask.length} 
                                                    currentPage={currentPage} 
                                                    paginate={paginate}/>}
            </div>
            {openModal && <Modal onSetModal={onSetModal} text={modalText}/>}
        </div>
    );
}

export default App;
