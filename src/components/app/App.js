import './app.scss'

import { useState, useEffect } from 'react';

import Header from '../header/Header';
import AppSort from '../appSort/AppSort';
import AppAddItem from '../appAddItem/AppAddItem'
import TaskList from '../taskList/TaskList';
import Pagination from '../pagination/Pagination'

const App = () => {
    const tasks = JSON.parse(localStorage.getItem('userData')) || [];

    const [task, SetTask] = useState(tasks);

    const [value, SetValue] = useState('');

    const [filter, setFilter] = useState('default');

    const [editTask, setEditTask] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = task.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = pageNumber => setCurrentPage(pageNumber);

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
        if(text.length !== 0 && text.length < 20) {
            SetTask(task => ([...task, newTask]))
            SetValue('')
        }
    }

    const onSetValue = (e) => {
        const text = e.target.value;
        SetValue(text)
    }

    const hendlerTask = (e, id) => { 
        switch (e) {
            case 'del': 
                const filterTask = task.filter(el => el.id !== id);
                SetTask(filterTask)
            break;
            case 'done' : 
                const doneTask = task.map(el => {
                    if(el.id === id) {
                        el.done = !el.done
                    }
        
                    return el;
                })
                SetTask(doneTask)
            break;
            case 'edit' : 
                SetTask(task.map(el => {
                    if(el.id === id) {
                        el.edit = !el.edit
                    }
                    return el;
                }))
            break;
            case 'editText' :
                SetTask(task.map(el => {
                    if(el.id === id) {
                        el.text = editTask;
                    }
                    return el;
                }))

                SetTask(task.map(el => {
                    if(el.edit === true) {
                        el.edit = false
                    }
                    return el;
                }))
                break;
            default: console.log(0);
        }
    }

    const onSetFilter = (e) => {
        const value = e.target.value;
        setFilter(value)
    }

    const onSortTask = (arr, filter) => {
        switch (filter) {
                case 'default' :
                    return arr;
                case 'true':
                    return arr.filter(el => el.done);
                case 'false': 
                    return arr.filter(el => !el.done);
                default : return arr;
            }
    }

    const onSetText = (e) => {
        const text = e.target.value;
        setEditTask(text)
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

                <TaskList 
                    tasks={onSortTask(currentItems, filter)} 
                    hendlerTask={hendlerTask} 
                    onSetText={onSetText}/>

                {task.length > 4 ? <Pagination itemsPerPage={itemsPerPage} totalItems={task.length} currentPage={currentPage} paginate={paginate}/> : null}
            </div>
        </div>
    );
}

export default App;
