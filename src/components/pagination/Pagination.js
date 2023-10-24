import { useEffect, useState } from 'react';
import './pagination.scss';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {

    const [page, setPage] = useState(1) 

    const totalItemPage = totalItems / itemsPerPage

    useEffect(() => {
        paginate(page)
    }, [page])

    const plusPage = () => {
        if(page < +totalItemPage) {
            setPage(page => page + 1);
        }
    }

    const minusPage = () => {
        if(page > 1) {
            setPage(page => page - 1);
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
