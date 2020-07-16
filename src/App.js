import React, {useReducer, useEffect} from 'react';
import logo from './logo.png';
import './App.css';
import { SortButton } from './components/SortButton';
import { sizeFormatter, dateDistanceFormatter, dateFormatter } from './utils/formatters';

const fetchProducts = async () => {
    const response = await fetch('http://localhost:3003/files');
    return await response.json();
};

const initialState = {
    files: [],
    sortedFiles: [],
    sortedBy: null,
    sortedDescend: false,
    error: null,
    loading: false,
    page: 0,
    sortBy: null
};

const sortFiles = (files, field, descending) => files.sort(
    descending
        ? (a, b) => a[field] > b[field] ? -1 : 1
        : (a, b) => a[field] > b[field] ? 1 : -1
);

const filesReducer = (state, action) => {
    if (action.type === 'receivedData') {
        return {...state, files: action.payload, sortedFiles: action.payload, loading: false };
    }
    if (action.type === 'loading') {
        return {...state, loading: true };
    }
    if (action.type === 'error') {
        return {...state, error: 'Error fetching the data', loading: false };
    }
    if (action.type === 'sort') {
        const field = action.payload;
        const descending = state.sortedBy === field && !state.sortedDescend;

        return {
            ...state,
            sortedBy: field,
            sortedDescend: descending,
            sortedFiles: sortFiles(state.files, field, descending)
        };
    }
    return {...state};
}

const App = () => {
    const [state, dispatch] = useReducer(filesReducer, initialState);
    useEffect(async () => {
        try {
            dispatch({type: 'loading'});
            dispatch({
                type: 'receivedData',
                payload: await fetchProducts()
            });
        } catch(e) {
            dispatch({type: 'error'});
        }
    }, []);
  return (
    <div className="container">
        { state.error && <div className="alert alert-danger">{state.error}</div>}
        <table className="table table-hover">
            <thead>
                <th>Id <SortButton onClick={() => dispatch({type: 'sort', payload: 'id'})} /></th>
                <th>Description <SortButton onClick={() => dispatch({type: 'sort', payload: 'desc'})} alphabetically /></th>
                <th>Filename <SortButton onClick={() => dispatch({type: 'sort', payload: 'name'})} alphabetically /></th>
                <th>Type <SortButton onClick={() => dispatch({type: 'sort', payload: 'ext'})} alphabetically /></th>
                <th>Created <SortButton onClick={() => dispatch({type: 'sort', payload: 'created'})} /></th>
                <th>Size <SortButton onClick={() => dispatch({type: 'sort', payload: 'created'})} /></th>
            </thead>
            <tbody>
            {state.files.map(f => (<tr>
                <td>{f.id}</td>
                <td>{f.desc}</td>
                <td>{f.name}</td>
                <td>{f.ext}</td>
                <td title={dateFormatter(f.created)}>{dateDistanceFormatter(f.created)}</td>
                <td>{sizeFormatter(f.size)}</td>
            </tr>))}
            </tbody>
        </table>
    </div>
  );
}

export default App;
