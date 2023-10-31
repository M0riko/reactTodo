import { useState, useMemo, useEffect } from 'react';

import './appSort.scss';

const AppSort = ({task, onSetFilterTask}) => {

    const [filter, setFilter] = useState('default');

    useEffect(() => {
        onSetFilterTask(filterTodoTask)
    })

    const filterTodoTask = useMemo(() => {
        if(filter === 'default') return task;

        if(filter === 'true') return task.filter(e => e.done === true);

        if(filter === 'false') return task.filter(e => e.done === false);
    }, [task, filter])

    return (
        <div className="option">
            <label htmlFor="mySelect">Выберите вариант сортировки</label>
            <select id="mySelect" onChange={(e) => setFilter(e.target.value)}>
            <option value="default">все задачи</option>
            <option value="true">выполненные</option>
            <option value="false">не выполненные</option>
            </select>
        </div>
    );
}

export default AppSort;
