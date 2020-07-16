import React from 'react';

export const Form = ({onChange}) => (
    <form>
        <label>Filter by name:</label> <input onChange={evt => onChange(evt.target.value)} />
    </form>
);
