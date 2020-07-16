import React from 'react';

export const Pagination = ({pageSize, page, filteredCount, onPreviousPage, onNextPage}) => (
    <section>
        <p>Showing {page * pageSize}-{(page + 1) * pageSize} items of {filteredCount}.</p>
        <p><span className="badge badge-secondary">Page {page + 1}</span></p>
        <p>
            <button className="btn btn-primary" onClick={onPreviousPage}>Previous Page</button>{' '}
            <button className="btn btn-primary" onClick={onNextPage}>Next Page</button>
        </p>
    </section>
);
