import './taskList.scss';

import Item from '../item/Item';

const TaskList = ({tasks, hendlerTask, onSetText, onSetModal}) => {
    return (
        <div className="task-list">  
            {tasks?.map(el => {
                return( <Item 
                    text={el.text} 
                    key={el.id} 
                    id={el.id} 
                    done={el.done}
                    edit={el.edit}
                    onSetText={onSetText}
                    onSetModal={onSetModal}
                    hendlerTask={hendlerTask}/>
                )
            })} 
        </div>
    );
}

export default TaskList;
