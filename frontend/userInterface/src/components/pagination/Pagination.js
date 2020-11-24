import React from 'react';


export default function Pagination(props) {
    const { pageIndex, total, perPage, onNext, onPrevious } = props;
    const lastPage = Math.ceil(total / perPage);
    const previous = pageIndex > 1 ? (<button onClick={onPrevious}>Previous</button>) : null;
    const next = pageIndex < lastPage ? (<button onClick={onNext}>Next</button>) : null;
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
