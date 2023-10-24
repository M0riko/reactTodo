import './appSort.scss';

const AppSort = ({onSetFilter}) => {
    return (
        <div className="option">
            <label htmlFor="mySelect">Выберите вариант сортировки</label>
            <select id="mySelect" onChange={onSetFilter}>
            <option value="default">все задачи</option>
            <option value="true">выполненные</option>
            <option value="false">не выполненные</option>
            </select>
        </div>
    );
}

export default AppSort;
