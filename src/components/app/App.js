import './app.scss'

import { useState, useMemo, useEffect } from 'react';


import Header from '../header/Header';
import AppSort from '../appSort/AppSort';
import AppAddItem from '../appAddItem/AppAddItem'
import TaskList from '../taskList/TaskList';
import Pagination from '../pagination/Pagination'
import Modal from '../modal/modal'
import Error from '../error/Error';

import { onRequest } from '../../service/getTasks';

const itemsPerPage = 4;

const App = () => {

    const [task, SetTask] = useState([]);

    const [filterTask, setFilterTask] = useState([])

    const [numForPaginat, setNumForPaginat] = useState([{pageOne: 0}, {pageTwo: 4}]);

    const [openModal, setOpenModal] = useState(false);

    const [modalText, setModalText] = useState('');

    useEffect(() => {
        onRequest().then(SetTask);
    }, [])

    const filterTodoItems = useMemo(() => {
        if(filterTask.length <= 4) return filterTask;
        return filterTask.slice(numForPaginat[0].pageOne, numForPaginat[1].pageTwo); 
    }, [filterTask, numForPaginat]);

    const onSetModal = (value) => {
        setOpenModal(openModal => !openModal);
        setModalText(value);
    } 

    const onSetNumForPaginat = (pageOne, pageTwo) => setNumForPaginat([{pageOne: pageOne}, {pageTwo: pageTwo}]);

    return (
        <div className='container'>
            <Header totalTask={filterTask}/>
            <div className="content">

                <AppSort 
                    task={task}
                    onSetFilterTask={setFilterTask}/>

                <AppAddItem onSetTask={SetTask}/>

                {filterTask.length < 1 ? <Error/> :<TaskList 
                                                        tasks={filterTodoItems}
                                                        SetTask={SetTask}
                                                        task={task}
                                                        onSetModal={onSetModal}/>}

                {filterTask.length > 4 && <Pagination 
                                                    itemsPerPage={itemsPerPage} 
                                                    items={filterTask} 
                                                    setNumForPaginat={onSetNumForPaginat}/>}
            </div>
            
            {openModal && <Modal 
                            onSetModal={onSetModal}  
                            text={modalText}/>}
        </div>
    );
}

export default App;