
export const initialState = {
    files: [],
    displayFiles: [],
    filteredCount: null,
    sortedBy: null,
    sortedDescend: false,
    filter: null,
    error: null,
    loading: false,
    page: 0,
    pageSize: 50,
    sortBy: null
};

const getDisplayFilesCount = ({files, filter = ''}) => {
    return files
        .filter(f => !filter || f.name.includes(filter))
        .length;
};

const getDisplayFiles = ({files, sortedBy = 'id', sortedDescend = false, filter = '', page = 0, pageSize}) => {
    return files
        .filter(f => !filter || f.name.includes(filter))
        .sort(sortedDescend
            ? (a, b) => a[sortedBy] > b[sortedBy] ? -1 : 1
            : (a, b) => a[sortedBy] > b[sortedBy] ? 1 : -1
        )
        .slice(page * pageSize, (page + 1) * pageSize);
};

export const filesReducer = (state, action) => {
    if (action.type === 'receivedData') {
        const newState = {
            ...state,
            files: action.payload,
            filteredCount: action.payload.length,
            loading: false
        };
        return { ...newState, displayFiles: getDisplayFiles(newState) };
    }
    if (action.type === 'setFilter') {
        const newState = {
            ...state,
            page: 0,
            filter: action.payload
        };
        const filteredFilesCount = getDisplayFilesCount(newState);
        return { ...newState, displayFiles: getDisplayFiles(newState), filteredCount: filteredFilesCount  };
    }
    if (action.type === 'nextPage') {
        const filteredFilesCount = getDisplayFilesCount(state);
        const newState = {...state, page: Math.min(state.page + 1, Math.floor(filteredFilesCount / state.pageSize)) };
        return { ...newState, displayFiles: getDisplayFiles(newState), filteredCount: filteredFilesCount };
    }
    if (action.type === 'previousPage') {
        const newState = {...state, page: Math.max(state.page - 1, 0)};
        const filteredFilesCount = getDisplayFilesCount(state);
        return { ...newState, displayFiles: getDisplayFiles(newState), filteredCount: filteredFilesCount  };
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
        const newState = {
            ...state,
            sortedBy: field,
            sortedDescend: descending,
        };
        return { ...newState, displayFiles: getDisplayFiles(newState) };
    }
    return {...state};
}

export const sortAction = column => ({type: 'sort', payload: column});
