import './taskList.scss';

import Item from '../item/Item';

const TaskList = ({tasks, hendlerTask, onSetText}) => {
    const items = tasks.map((el, i) => {
        return(<Item 
                    text={el.text} 
                    key={i} 
                    id={el.id} 
                    done={el.done}
                    del={() => hendlerTask('del', el.id)}
                    sesss={() => hendlerTask('done', el.id)}
                    edit={el.edit}
                    edits={() => hendlerTask('edit', el.id)}
                    editText={() => hendlerTask('editText', el.id)}
                    onSetText={onSetText}/>
                )
    })

    return (
        <div className="task-list">  
            {items} 
        </div>
    );
}

export default TaskList;
