import {useEffect, useState } from 'react';
import './pagination.scss';

const Pagination = ({itemsPerPage, items, setNumForPaginat}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const totalItemPage =  Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        setNumForPaginat(indexOfFirstItem, indexOfLastItem)
    }, [indexOfFirstItem, indexOfLastItem])

    useEffect(() => {
        if(totalItemPage < currentPage ) {
            setCurrentPage(totalItemPage)
        }   
    }, [currentPage, totalItemPage])

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
        <div className="conteinet-paginat">
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
