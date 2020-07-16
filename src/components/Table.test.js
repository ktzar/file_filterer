import React from 'react';
import { Table } from './Table';
import { shallow, mount } from 'enzyme';

const files = [
    {
        "id": 0,
        "name": "clothing_nebraska_fords.html",
        "ext": "html",
        "desc": "Dolor adipisci autem excepturi distinctio laboriosam ut.",
        "created": "2020-04-29T17:11:19.629Z",
        "size": 817842228
    },
    {
        "id": 1,
        "name": "index_paradigm.jpeg",
        "ext": "jpeg",
        "desc": "Qui ut provident aut maiores.",
        "created": "2019-12-04T13:32:55.215Z",
        "size": 7719455351
    },
];

describe('Table component', () => {
    it('has one row per piece of data plus a header', () => {
        const wrapper = shallow(<Table files={files} />);
        expect(wrapper.find('tr').length).toBe(3);
    });

    it('has one button per column', () => {
        const wrapper = mount(<Table files={files}/>);
        expect(wrapper.find('button').length).toBe(6);
    });

    it('triggers onSortBy', () => {
        const spy = jest.fn();

        const wrapper = mount(<Table onSortBy={spy} files={files}/>);
        wrapper.find('button').first().simulate('click');
        expect(spy).toHaveBeenCalled();
    });
});
