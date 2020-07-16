import React from 'react';
import { SortButton } from './SortButton';
import { sizeFormatter, dateDistanceFormatter, dateFormatter } from '../utils/formatters';

export const Table = ({files, onSortBy}) => {
    if (!files || !files.length) {
        return <div>No results</div>;
    }

    return (
        <table className="table table-hover">
            <thead><tr>
                <th with="50px">Id <SortButton onClick={() => onSortBy('id')} /></th>
                <th>Description <SortButton onClick={() => onSortBy('desc')} alphabetically /></th>
                <th with="300px">Filename <SortButton onClick={() => onSortBy('name')} alphabetically /></th>
                <th width="80px">Type <SortButton onClick={() => onSortBy('ext')} alphabetically /></th>
                <th width="120px">Created <SortButton onClick={() => onSortBy('created')} /></th>
                <th width="120px">Size <SortButton onClick={() => onSortBy('created')} /></th>
                </tr></thead>
            <tbody>
            {files.map((f,i) => (<tr key={i}>
                <td>{f.id}</td>
                <td>{f.desc}</td>
                <td>{f.name}</td>
                <td>{f.ext}</td>
                <td title={dateFormatter(f.created)}>{dateDistanceFormatter(f.created)}</td>
                <td>{sizeFormatter(f.size)}</td>
            </tr>))}
            </tbody>
        </table>
    );
};
