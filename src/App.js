import React, {useReducer, useEffect} from 'react';
import logo from './logo.png';
import './App.css';
import { Pagination } from './components/Pagination';
import { Form } from './components/Form';
import { Table } from './components/Table';
import { filesReducer, sortAction, initialState } from './state/files';

const fetchProducts = async () => {
    const response = await fetch('http://localhost:3003/files');
    return await response.json();
};

const App = () => {
    const [state, emit] = useReducer(filesReducer, initialState);
    useEffect(async () => {
        try {
            emit({type: 'loading'});
            emit({
                type: 'receivedData',
                payload: await fetchProducts()
            });
        } catch (e) {
            emit({type: 'error'});
        }
    }, []);
    const { error, page, pageSize, filteredCount, displayFiles } = state;
    return (
        <div className="container">
            <h1>List of files</h1>
            { error && <div className="alert alert-danger">{error}</div>}
            <Pagination
                pageSize={pageSize}
                page={page}
                filteredCount={filteredCount}
                onPreviousPage={() => emit({type: 'previousPage'})}
                onNextPage={() => emit({type: 'nextPage'})}
            />
            <Form onChange={val => emit({type: 'setFilter', payload: val})} />
            <Table files={displayFiles} onSortBy={column => emit(sortAction(column))} />
        </div>
    );
}

export default App;
