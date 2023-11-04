import { useState, useEffect } from 'react';

import Header from '../header/Header';
import AppSort from '../appSort/AppSort';
import AppAddItem from '../appAddItem/AppAddItem'
import TaskList from '../taskList/TaskList';
import Error from '../error/Error';

import { onRequest } from '../../service/getTasks';

const App = () => {

    useEffect(() => {
        onRequest().then(SetTask);
    }, [])

    const [task, SetTask] = useState([]);

    const [filterTask, setFilterTask] = useState([]);

    return (
        <div className='container'>
            <Header totalTask={filterTask}/>
            <div className="content">
                <AppSort task={task} onSetFilterTask={setFilterTask}/>
                <AppAddItem onSetTask={SetTask}/>
                {filterTask.length < 1 ? <Error/> : <TaskList SetTask={SetTask} task={task}/>}
            </div>
        </div>
    );
}

export default App;