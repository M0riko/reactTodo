import {useEffect, useMemo, useState } from 'react';
import './pagination.scss';
const itemsPerPage = 4;

const Pagination = ({filterTask, setShowTask}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const totalItemPage =  Math.ceil(filterTask.length / itemsPerPage);
    
    const filterTodoItems = useMemo(() => {
        if (filterTask.length <= 4) return filterTask;
        return filterTask.slice(indexOfFirstItem, indexOfLastItem);
    }, [filterTask, indexOfFirstItem, indexOfLastItem]);  

    useEffect(() => {
        if(totalItemPage < currentPage && currentPage > 1) {
            setCurrentPage(totalItemPage)
        } 
    }, [currentPage, totalItemPage])

    useEffect(() => {
        setShowTask(filterTodoItems);
    }, [filterTodoItems, filterTask, setShowTask]);

    const plusPage = () => {
        if(currentPage < +totalItemPage) {
            setCurrentPage(currentPage => currentPage + 1);
        }
    }

    const minusPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage => currentPage - 1);
        }
    }

    return (
        <div className={`conteinet-paginat ${filterTask.length <= 4 ? 'none' : ''}`}>
        <div className="paginat">
            <div className="prev" onClick={minusPage}>
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" stroke="rgb(64, 175, 255)" strokeWidth="1.5" fill="none" />
                    <line x1="15" y1="25" x2="35" y2="25" stroke="rgb(64, 175, 255)" strokeWidth="2" />
                    <polygon points="15,25 20,20 20,30" fill="rgb(64, 175, 255)" />
                </svg>
            </div>
            <span className="countPaginat">{currentPage}</span>
            <div className="next" onClick={plusPage}>
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" stroke="rgb(64, 175, 255)" strokeWidth="1.5" fill="none" />
                    <line x1="15" y1="25" x2="35" y2="25" stroke="rgb(64, 175, 255)" strokeWidth="2" />
                    <polygon points="35,25 30,20 30,30" fill="rgb(64, 175, 255)" />
                </svg>
            </div>
        </div>           
    </div>
    );
}

export default Pagination;
