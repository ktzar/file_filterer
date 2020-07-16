import { initialState, filesReducer } from './files';

describe('Files reducer', () => {
    it('can store received data', () => {
        const newState = filesReducer(initialState, {
            type: 'receivedData',
            payload: [1,2,3,4,5,6,6]
        });
        expect(newState.files).toEqual([1,2,3,4,5,6,6]);
        expect(newState.filteredCount).toEqual(7);
    });

    it('can set a filter', () => {
        const newState = filesReducer(
            {
                ...initialState,
                files: [{name: 'abc'}, {name: 'def'}]
            },
            {
                type: 'setFilter',
                payload: 'abc'
            }
        );
        expect(newState.displayFiles).toEqual([{name: 'abc'}]);
    });

});
