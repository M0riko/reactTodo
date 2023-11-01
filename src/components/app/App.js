import './app.scss'

import { useState, useEffect } from 'react';


import Header from '../header/Header';
import AppSort from '../appSort/AppSort';
import AppAddItem from '../appAddItem/AppAddItem'
import TaskList from '../taskList/TaskList';
import Pagination from '../pagination/Pagination'
import Modal from '../modal/modal'
import Error from '../error/Error';

import { onRequest } from '../../service/getTasks';

const App = () => {

    useEffect(() => {
        onRequest().then(SetTask);
    }, [])

    const [task, SetTask] = useState([]);

    const [filterTask, setFilterTask] = useState([]);

    const [showTask, setShowTask] = useState([]);
 
    const [openModal, setOpenModal] = useState(false);

    const [modalText, setModalText] = useState('');

    const onSetModal = (value) => {
        setOpenModal(openModal => !openModal);
        setModalText(value);
    } 

    return (
        <div className='container'>
            <Header totalTask={filterTask}/>
            <div className="content">
                <AppSort task={task} onSetFilterTask={setFilterTask}/>
                <AppAddItem onSetTask={SetTask}/>
                {filterTask.length < 1 ? <Error/> :<TaskList tasks={showTask} SetTask={SetTask} task={task} onSetModal={onSetModal}/>}
                <Pagination filterTask={filterTask} setShowTask={setShowTask}/>
            </div>
            {openModal && <Modal onSetModal={onSetModal} text={modalText}/>}
        </div>
    );
}

export default App;