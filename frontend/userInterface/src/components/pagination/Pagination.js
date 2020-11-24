import axios from 'axios';
import React, { useEffect } from 'react';


export default function Pagination(props) {
    const { pageIndex, total, perPage, onNext, onPrevious, setAllJobs, setNext, setOnPrevious, setPageIndex } = props;
    const lastPage = Math.ceil(total / perPage);
    const previous = pageIndex > 1 ? (<button onClick={() => previousPage()}>Previous</button>) : null;
    const next = pageIndex < lastPage ? (<button onClick={() => nextPage()}>Next</button>) : null;
    
    const nextPage = () => {
        axios.get(onNext)
            .then(res => {
                setAllJobs(res.data.results)
                setNext(res.data.next)
                setOnPrevious(res.data.previous)
                setPageIndex(pageIndex+1)
            })
    }

    const previousPage = () => {
        axios.get(onPrevious)
            .then(res => {
                setAllJobs(res.data.results)
                setNext(res.data.next)
                setOnPrevious(res.data.previous)
                setPageIndex(pageIndex - 1)
            })
    }

    return (
        <div className="Pagination">
            <div className="Pagination-actions">
                {previous}
                {next}
            </div>
            <div className="Pagination-stats">
                Page {pageIndex} of {lastPage}
        &nbsp;(displaying {perPage} items per page)
      </div>
        </div>
    );
}
